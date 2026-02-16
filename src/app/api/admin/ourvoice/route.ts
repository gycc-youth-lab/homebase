import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '25')
    const skip = (page - 1) * limit

    const db = await getDatabase()

    const totalCount = await db.collection('ourvoice').countDocuments()

    const posts = await db.collection('ourvoice')
      .find()
      .sort({ regdate: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const transformedPosts = posts.map(post => ({
      id: post._id.toString(),
      subject: post.subject,
      contentMD: post.contentMD || '',
      hashtag: post.hashtag || '',
      videoUrl: post.mUrl || null,
      actstatus: post.actstatus,
      hit: post.hit?.$numberLong || post.hit || 0,
      createdAt: post.regdate,
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
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
    const { subject, contentMD, hashtag, mUrl } = body

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
      mUrl: mUrl?.trim() || '',
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
