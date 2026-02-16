import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { auth } from '@/lib/auth'
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

async function getPresignedThumbnailUrl(filename: string | null): Promise<string | null> {
  if (!filename) return null
  try {
    const command = new GetObjectCommand({
      Bucket: MINIO_BUCKET,
      Key: `htdocs-full/upload/thumb/${filename}`,
    })
    return await getSignedUrl(minioClient, command, { expiresIn: 3600 })
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const db = await getDatabase()
    
    // Get total count for pagination
    const totalCount = await db.collection('ourvoice').countDocuments({ actstatus: 'Y' })
    
    // Fetch paginated posts
    const posts = await db.collection('ourvoice')
      .find({ actstatus: 'Y' })
      .sort({ regdate: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Transform posts for frontend with presigned URLs
    const transformedPosts = await Promise.all(posts.map(async post => ({
      id: post._id.toString(),
      subject: post.subject,
      content: post.content,
      contentMD: post.contentMD || '',
      slug: post.subject
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim(),
      hashtag: post.hashtag,
      thumbnail: await getPresignedThumbnailUrl(post.thumbnailSv),
      thumbnailOriginal: post.thumbnailOr,
      videoUrl: post.mUrl,
      createdAt: post.regdate,
      hit: post.hit?.$numberLong || post.hit || 0
    })))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error: unknown) {
    console.error('Error fetching ourvoice posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { subject, contentMD, hashtag } = body

    if (!subject?.trim()) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      )
    }

    if (!contentMD?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    const newPost = {
      subject: subject.trim(),
      contentMD: contentMD.trim(),
      hashtag: hashtag?.trim() || '',
      mUrl: '',
      actstatus: 'Y',
      hit: 0,
      regdate: new Date(),
    }

    const result = await db.collection('ourvoice').insertOne(newPost)

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: { id: result.insertedId.toString(), ...newPost },
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Error creating ourvoice post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

