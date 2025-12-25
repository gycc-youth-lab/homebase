'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/Container'
import { DisplayMD, TextMD } from '@/components/Typography'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  author_id: string
  created_at: string
  profiles: {
    username: string
    full_name: string | null
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        
        if (data.posts) {
          setPosts(data.posts)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen py-24">
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-24">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <DisplayMD weight="semibold" className="text-[#101828]">
              Blog Posts
            </DisplayMD>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <TextMD className="text-[#475467]">
                No blog posts yet.
              </TextMD>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <article key={post.id} className="border border-[#EAECF0] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl font-semibold text-[#101828] hover:text-[#1DADDF] transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <TextMD className="text-[#475467]">
                          {post.excerpt}
                        </TextMD>
                      )}
                      <div className="flex items-center gap-4 text-sm text-[#667085]">
                        <span>By {post.profiles?.full_name || post.profiles?.username || 'Unknown'}</span>
                        <span>•</span>
                        <time dateTime={post.created_at}>
                          {new Date(post.created_at).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}
