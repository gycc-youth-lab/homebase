import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const db = await getDatabase()
    
    const posts = await db.collection('posts')
      .aggregate([
        { $match: { published: true } },
        {
          $lookup: {
            from: 'users',
            localField: 'author_id',
            foreignField: '_id',
            as: 'author'
          }
        },
        { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            title: 1,
            slug: 1,
            excerpt: 1,
            author_id: 1,
            created_at: 1,
            profiles: {
              username: '$author.username',
              full_name: '$author.full_name'
            }
          }
        },
        { $sort: { created_at: -1 } }
      ])
      .toArray()

    // Transform _id to id for frontend compatibility
    const transformedPosts = posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author_id: post.author_id?.toString(),
      created_at: post.created_at,
      profiles: post.profiles
    }))

    return NextResponse.json({ posts: transformedPosts })
  } catch (error: unknown) {
    console.error('Error fetching posts:', error)
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
    const { title, content, excerpt, author_id } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const db = await getDatabase()
    const now = new Date()
    
    const result = await db.collection('posts').insertOne({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt?.trim() || null,
      author_id: author_id ? new ObjectId(author_id) : null,
      published: true,
      created_at: now,
      updated_at: now
    })

    const post = await db.collection('posts').findOne({ _id: result.insertedId })

    return NextResponse.json(
      { 
        message: 'Post created successfully', 
        post: { ...post, id: post?._id.toString() } 
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    )
  }
}
