import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    const db = await getDatabase()

    const post = await db.collection('ourvoice').findOne({ _id: new ObjectId(id) })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({
      post: {
        id: post._id.toString(),
        subject: post.subject,
        contentMD: post.contentMD || '',
        hashtag: post.hashtag || '',
        videoUrl: post.mUrl || null,
        actstatus: post.actstatus,
        hit: post.hit?.$numberLong || post.hit || 0,
        createdAt: post.regdate,
      },
    })
  } catch (error: unknown) {
    console.error('Error fetching ourvoice post:', error)
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

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    const body = await request.json()
    const updateFields: Record<string, unknown> = {}

    if (body.subject !== undefined) {
      if (!body.subject?.trim()) {
        return NextResponse.json({ error: 'Subject cannot be empty' }, { status: 400 })
      }
      updateFields.subject = body.subject.trim()
    }

    if (body.contentMD !== undefined) {
      if (!body.contentMD?.trim()) {
        return NextResponse.json({ error: 'Content cannot be empty' }, { status: 400 })
      }
      updateFields.contentMD = body.contentMD.trim()
    }

    if (body.hashtag !== undefined) {
      updateFields.hashtag = body.hashtag.trim()
    }

    if (body.mUrl !== undefined) {
      updateFields.mUrl = body.mUrl.trim()
    }

    if (body.actstatus !== undefined) {
      updateFields.actstatus = body.actstatus
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const db = await getDatabase()

    const result = await db.collection('ourvoice').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Post updated successfully',
      post: {
        id: result._id.toString(),
        subject: result.subject,
        contentMD: result.contentMD || '',
        hashtag: result.hashtag || '',
        videoUrl: result.mUrl || null,
        actstatus: result.actstatus,
        hit: result.hit?.$numberLong || result.hit || 0,
        createdAt: result.regdate,
      },
    })
  } catch (error: unknown) {
    console.error('Error updating ourvoice post:', error)
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

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    const db = await getDatabase()

    const result = await db.collection('ourvoice').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { actstatus: 'N' } },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Post deactivated successfully' })
  } catch (error: unknown) {
    console.error('Error deactivating ourvoice post:', error)
    return NextResponse.json(
      { error: 'Failed to deactivate post' },
      { status: 500 }
    )
  }
}
