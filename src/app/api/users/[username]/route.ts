import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', profile.id)

    if (postsError) {
      return NextResponse.json({ error: postsError.message }, { status: 500 })
    }

    return NextResponse.json({ ...profile, posts })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
