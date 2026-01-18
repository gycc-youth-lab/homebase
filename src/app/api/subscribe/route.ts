import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

// Use testNewsletterSignup in development, newsletterSignup in production
const getCollectionName = () => {
  return process.env.NODE_ENV === 'development' ? 'testNewsletterSignup' : 'newsletterSignup'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    // Validation
    if (!firstName?.trim()) {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      )
    }

    if (!lastName?.trim()) {
      return NextResponse.json(
        { error: 'Last name is required' },
        { status: 400 }
      )
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collectionName = getCollectionName()

    // Check if email already exists
    const existingSubscriber = await db.collection(collectionName).findOne({
      email: email.toLowerCase().trim()
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    const now = new Date()
    const result = await db.collection(collectionName).insertOne({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      createdAt: now,
      updatedAt: now
    })

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter',
        data: { id: result.insertedId.toString() }
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
