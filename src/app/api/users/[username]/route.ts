import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  try {
    const db = await getDatabase()
    
    const profile = await db.collection('users').findOne({ username })

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const posts = await db.collection('posts')
      .find({ author_id: profile._id })
      .toArray()

    // Transform for frontend compatibility
    const transformedPosts = posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      published: post.published,
      created_at: post.created_at,
      updated_at: post.updated_at
    }))

    return NextResponse.json({ 
      id: profile._id.toString(),
      username: profile.username,
      full_name: profile.full_name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      posts: transformedPosts 
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
