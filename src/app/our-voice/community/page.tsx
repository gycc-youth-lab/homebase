'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/Container'
import { DisplayMD, TextMD, TextSM } from '@/components/Typography'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

interface Pagination {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<OurVoicePost[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const response = await fetch(`/api/ourvoice?page=${currentPage}&limit=12`)
        const data = await response.json()
        
        if (data.posts) {
          setPosts(data.posts)
          setPagination(data.pagination)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Strip HTML tags for excerpt
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return []
    
    const pages: (number | string)[] = []
    const { currentPage, totalPages } = pagination
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  if (loading && posts.length === 0) {
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
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="text-center">
            <DisplayMD weight="semibold" className="text-[#101828] mb-4">
              From Our Community
            </DisplayMD>
            <TextMD className="text-[#475467] max-w-2xl mx-auto">
              Hear the voices of young people from around the world sharing their perspectives on climate challenges and solutions.
            </TextMD>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <TextMD className="text-[#475467]">
                No community posts yet.
              </TextMD>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/our-voice/community/${post.slug}`}
                  className="group"
                >
                  <article className="h-full border border-[#EAECF0] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-[#F2F4F7] overflow-hidden">
                      {post.thumbnail ? (
                        <Image
                          src={`/images/ourvoice/${post.thumbnail}`}
                          alt={post.subject}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : post.videoUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#101828]">
                          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[#98A2B3] text-4xl">📝</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-[#101828] line-clamp-2 group-hover:text-[#1DADDF] transition-colors">
                        {post.subject}
                      </h3>
                      <p className="text-sm text-[#475467] line-clamp-3">
                        {stripHtml(post.content)}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#EAECF0]">
                        <TextSM className="text-[#667085]">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TextSM>
                        <TextSM className="text-[#667085]">
                          {post.hit} views
                        </TextSM>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#475467] hover:text-[#182230] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-[#1DADDF] text-white'
                          : 'text-[#475467] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="w-10 h-10 flex items-center justify-center text-[#475467]">
                      {page}
                    </span>
                  )
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#475467] hover:text-[#182230] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Total Count */}
          {pagination && (
            <div className="text-center">
              <TextSM className="text-[#667085]">
                Showing {posts.length} of {pagination.totalCount} posts
              </TextSM>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

