import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getDatabase()
    
    const query: { _id?: ObjectId; slug?: string } = {}
    
    // Support both ObjectId and slug lookup
    if (ObjectId.isValid(id)) {
      query._id = new ObjectId(id)
    } else {
      query.slug = id
    }

    const post = await db.collection('posts')
      .aggregate([
        { $match: query },
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
            content: 1,
            excerpt: 1,
            author_id: 1,
            published: 1,
            created_at: 1,
            updated_at: 1,
            profiles: {
              username: '$author.username',
              full_name: '$author.full_name'
            }
          }
        }
      ])
      .toArray()

    if (!post || post.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const transformedPost = {
      id: post[0]._id.toString(),
      title: post[0].title,
      slug: post[0].slug,
      content: post[0].content,
      excerpt: post[0].excerpt,
      author_id: post[0].author_id?.toString(),
      published: post[0].published,
      created_at: post[0].created_at,
      updated_at: post[0].updated_at,
      profiles: post[0].profiles
    }

    return NextResponse.json({ post: transformedPost })
  } catch (error: unknown) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, content, excerpt, published } = body

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
    
    const result = await db.collection('posts').findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: title.trim(),
          slug,
          content: content.trim(),
          excerpt: excerpt?.trim() || null,
          published: published ?? true,
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: 'Post updated successfully', 
      post: { ...result, id: result._id.toString() }
    })
  } catch (error: unknown) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const db = await getDatabase()
    
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error: unknown) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
