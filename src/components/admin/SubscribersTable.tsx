'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface Subscriber {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function SubscribersTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '25' })
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/subscribers?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setSubscribers(data.subscribers)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div>
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
          />
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto border border-[#EAECF0] rounded-lg">
        <table className="min-w-full divide-y divide-[#EAECF0]">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#EAECF0]">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-[#667085]">Loading...</td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-[#667085]">No subscribers found.</td>
              </tr>
            ) : (
              subscribers.map(sub => (
                <tr key={sub.id} className="hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4 text-sm text-[#101828]">{sub.firstName}</td>
                  <td className="px-6 py-4 text-sm text-[#101828]">{sub.lastName}</td>
                  <td className="px-6 py-4 text-sm text-[#667085]">{sub.email}</td>
                  <td className="px-6 py-4 text-sm text-[#667085]">
                    {new Date(sub.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
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
