'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

interface OurVoicePost {
  id: string
  subject: string
  actstatus: string
  hit: number
  createdAt: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function OurVoiceTable() {
  const [posts, setPosts] = useState<OurVoicePost[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '25' })
      const res = await fetch(`/api/admin/ourvoice?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setPosts(data.posts)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Y' ? 'N' : 'Y'
    try {
      const res = await fetch(`/api/admin/ourvoice/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actstatus: newStatus }),
      })
      if (!res.ok) throw new Error('Failed to update')
      fetchPosts()
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div />
        <Link
          href="/admin/ourvoice/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DADDF] text-white text-sm font-medium rounded-lg hover:bg-[#1898C7] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#EAECF0] rounded-lg">
        <table className="min-w-full divide-y divide-[#EAECF0]">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#EAECF0]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-[#667085]">Loading...</td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-[#667085]">No posts found.</td>
              </tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4 text-sm text-[#101828] max-w-xs truncate">{post.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.actstatus === 'Y'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {post.actstatus === 'Y' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#667085]">{post.hit}</td>
                  <td className="px-6 py-4 text-sm text-[#667085]">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/ourvoice/${post.id}/edit`}
                        className="text-[#1DADDF] hover:text-[#1898C7] font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(post.id, post.actstatus)}
                        className={`font-medium ${
                          post.actstatus === 'Y'
                            ? 'text-red-600 hover:text-red-800'
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {post.actstatus === 'Y' ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-[#667085]">
            Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} total)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={!pagination.hasPrevPage}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-[#D0D5DD] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB]"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!pagination.hasNextPage}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-[#D0D5DD] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB]"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
