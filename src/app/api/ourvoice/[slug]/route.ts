import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

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
      slug: slug,
      hashtag: post.hashtag,
      thumbnail: post.thumbnailSv,
      thumbnailOriginal: post.thumbnailOr,
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

