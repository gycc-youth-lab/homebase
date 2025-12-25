import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

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

    // Transform posts for frontend
    const transformedPosts = posts.map(post => ({
      id: post._id.toString(),
      subject: post.subject,
      content: post.content,
      slug: post.subject
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim(),
      hashtag: post.hashtag,
      thumbnail: post.thumbnailSv,
      thumbnailOriginal: post.thumbnailOr,
      videoUrl: post.mUrl,
      createdAt: post.regdate,
      hit: post.hit?.$numberLong || post.hit || 0
    }))

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

