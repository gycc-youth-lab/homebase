'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/Container'
import { DisplayMD } from '@/components/Typography'

interface BlogPost {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
  profiles: {
    username: string
    full_name: string | null
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const slug = params?.slug as string

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true)
          } else {
            throw new Error('Failed to fetch post')
          }
          return
        }
        
        const data = await response.json()
        setPost(data.post)
      } catch (error) {
        console.error('Error fetching post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen py-24">
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </main>
    )
  }

  if (notFound) {
    return (
      <main className="min-h-screen py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-[#1DADDF] hover:underline">
              Back to Blog
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  if (!post) return null

  return (
    <main className="min-h-screen py-24">
      <Container>
        <article className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <Link href="/blog" className="text-[#1DADDF] hover:underline">
                ← Back to Blog
              </Link>
            </div>

            <header className="flex flex-col gap-4">
              <DisplayMD weight="semibold" className="text-[#101828]">
                {post.title}
              </DisplayMD>
              
              <div className="flex items-center gap-4 text-sm text-[#667085]">
                <span>By {post.profiles?.full_name || post.profiles?.username || 'Unknown'}</span>
                <span>•</span>
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.updated_at !== post.created_at && (
                  <>
                    <span>•</span>
                    <span>Updated {new Date(post.updated_at).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-[#374151]">
                {post.content}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </main>
  )
}
