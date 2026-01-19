'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/Container'
import { DisplayMD } from '@/components/Typography'
import { ArrowLeft, Eye, Calendar } from 'lucide-react'
import { ContentRenderer } from '@/lib/contentParser'

// Component to handle featured image loading with fallback
function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  if (imageError) {
    return null
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-[#F2F4F7]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        onError={handleImageError}
      />
    </div>
  )
}

interface OurVoicePost {
  id: string
  subject: string
  content: string
  slug: string
  hashtag: string
  thumbnail: string | null
  thumbnailOriginal: string | null
  videoUrl: string | null
  createdAt: string
  hit: number
}

export default function CommunityPostPage() {
  const params = useParams()
  const [post, setPost] = useState<OurVoicePost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const slug = params?.subject as string

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/ourvoice/${slug}`)
        
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

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

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
            <Link href="/our-voice/community" className="text-[#1DADDF] hover:underline">
              Back to Community
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  if (!post) return null

  const youtubeId = post.videoUrl ? getYouTubeId(post.videoUrl) : null

  return (
    <main className="min-h-screen py-24">
      <Container>
        <article className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            {/* Back Button */}
            <Link
              href="/our-voice/community"
              className="inline-flex items-center gap-2 text-[#1DADDF] hover:text-[#1898C7] transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Link>

            {/* Header */}
            <header className="flex flex-col gap-4">
              <DisplayMD weight="semibold" className="text-[#101828]">
                {post.subject}
              </DisplayMD>
              
              <div className="flex items-center gap-6 text-sm text-[#667085]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.hit} views</span>
                </div>
              </div>
            </header>

            {/* Featured Media */}
            {youtubeId ? (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#101828]">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={post.subject}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : post.thumbnail ? (
              <FeaturedImage
                src={`/images/ourvoice/${post.thumbnail}`}
                alt={post.subject}
              />
            ) : null}

            {/* Content */}
            <ContentRenderer content={post.content} />

            {/* Footer */}
            <div className="pt-8 border-t border-[#EAECF0]">
              <Link
                href="/our-voice/community"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DADDF] text-white rounded-lg hover:bg-[#1898C7] transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                View More Stories
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </main>
  )
}

