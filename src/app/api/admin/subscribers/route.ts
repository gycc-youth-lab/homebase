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
    const search = searchParams.get('search') || ''
    const skip = (page - 1) * limit

    const db = await getDatabase()

    const filter: Record<string, unknown> = {}
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    const totalCount = await db.collection('newsletterSignup').countDocuments(filter)

    const subscribers = await db.collection('newsletterSignup')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const transformedSubscribers = subscribers.map(sub => ({
      id: sub._id.toString(),
      firstName: sub.firstName,
      lastName: sub.lastName,
      email: sub.email,
      createdAt: sub.createdAt,
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      subscribers: transformedSubscribers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error: unknown) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
