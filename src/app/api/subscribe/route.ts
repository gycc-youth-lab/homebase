import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, full_name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if email already exists
    const existingSubscriber = await db.collection('subscribers').findOne({ 
      email: email.toLowerCase().trim() 
    })
    
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    const now = new Date()
    const result = await db.collection('subscribers').insertOne({
      email: email.toLowerCase().trim(),
      full_name: full_name || null,
      created_at: now,
      updated_at: now
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
