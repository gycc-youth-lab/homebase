import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// MinIO client configuration
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'gycc-objects.zeabur.app'
const MINIO_PORT = process.env.MINIO_PORT || '443'
const MINIO_USE_SSL = process.env.MINIO_USE_SSL !== 'false'
const MINIO_BUCKET = process.env.MINIO_BUCKET || 'zeabur'

const protocol = MINIO_USE_SSL ? 'https' : 'http'
const isStandardPort = (MINIO_USE_SSL && MINIO_PORT === '443') || (!MINIO_USE_SSL && MINIO_PORT === '80')
const endpointUrl = isStandardPort
  ? `${protocol}://${MINIO_ENDPOINT}`
  : `${protocol}://${MINIO_ENDPOINT}:${MINIO_PORT}`

const minioClient = new S3Client({
  endpoint: endpointUrl,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || '',
    secretAccessKey: process.env.MINIO_SECRET_KEY || '',
  },
  forcePathStyle: true,
})

async function getPresignedUrl(folder: string, filename: string | null): Promise<string | null> {
  if (!filename) return null
  try {
    const command = new GetObjectCommand({
      Bucket: MINIO_BUCKET,
      Key: `htdocs-full/upload/${folder}/${filename}`,
    })
    return await getSignedUrl(minioClient, command, { expiresIn: 3600 })
  } catch {
    return null
  }
}

async function getEditorImagePresignedUrl(filename: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: MINIO_BUCKET,
      Key: `htdocs-full/upload/editor_img/${filename}`,
    })
    return await getSignedUrl(minioClient, command, { expiresIn: 3600 })
  } catch {
    return `https://gycc4youth.org/upload/editor_img/${filename}` // fallback to original
  }
}

async function processMarkdownImages(content: string | null): Promise<string | null> {
  if (!content) return null

  // Match markdown images: ![alt](url) and HTML images: <img src="url"
  const mdImagePattern = /!\[([^\]]*)\]\((https?:\/\/gycc4youth\.org\/upload\/editor_img\/([^)]+))\)/g
  const htmlImagePattern = /<img[^>]*src=["'](https?:\/\/gycc4youth\.org\/upload\/editor_img\/([^"']+))["'][^>]*>/g

  let processedContent = content

  // Process markdown images
  const mdMatches = [...content.matchAll(mdImagePattern)]
  for (const match of mdMatches) {
    const [fullMatch, alt, , filename] = match
    const presignedUrl = await getEditorImagePresignedUrl(filename)
    processedContent = processedContent.replace(fullMatch, `![${alt}](${presignedUrl})`)
  }

  // Process HTML images
  const htmlMatches = [...processedContent.matchAll(htmlImagePattern)]
  for (const match of htmlMatches) {
    const [fullMatch, oldUrl, filename] = match
    const presignedUrl = await getEditorImagePresignedUrl(filename)
    processedContent = processedContent.replace(fullMatch, fullMatch.replace(oldUrl, presignedUrl))
  }

  return processedContent
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const db = await getDatabase()
    
    // Find the post by matching the slugified subject
    const posts = await db.collection('ourvoice')
      .find({ actstatus: 'Y' })
      .toArray()
    
    // Find the post where the slugified subject matches the URL slug
    const post = posts.find(p => {
      const postSlug = p.subject
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      return postSlug === slug
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Increment hit count
    await db.collection('ourvoice').updateOne(
      { _id: post._id },
      { $inc: { hit: 1 } }
    )

    const transformedPost = {
      id: post._id.toString(),
      subject: post.subject,
      content: post.content,
      contentMD: await processMarkdownImages(post.contentMD),
      slug: slug,
      hashtag: post.hashtag,
      thumbnail: await getPresignedUrl('thumb', post.thumbnailSv),
      thumbnailOriginal: await getPresignedUrl('thumb', post.thumbnailOr),
      file: await getPresignedUrl('file', post.fileSv),
      fileOriginal: post.fileOr,
      videoUrl: post.mUrl,
      createdAt: post.regdate,
      hit: (post.hit?.$numberLong || post.hit || 0) + 1
    }

    return NextResponse.json({ post: transformedPost })
  } catch (error: unknown) {
    console.error('Error fetching ourvoice post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

