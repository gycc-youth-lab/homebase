'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { MarkdownRenderer } from '@/lib/contentParser'

interface OurVoiceFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    id: string
    subject: string
    contentMD: string
    hashtag: string
    videoUrl: string | null
    actstatus: string
  }
}

export default function OurVoiceForm({ mode, initialData }: OurVoiceFormProps) {
  const router = useRouter()
  const [subject, setSubject] = useState(initialData?.subject || '')
  const [contentMD, setContentMD] = useState(initialData?.contentMD || '')
  const [hashtag, setHashtag] = useState(initialData?.hashtag || '')
  const [mUrl, setMUrl] = useState(initialData?.videoUrl || '')
  const [actstatus, setActstatus] = useState(initialData?.actstatus || 'Y')
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const url = mode === 'create'
        ? '/api/admin/ourvoice'
        : `/api/admin/ourvoice/${initialData!.id}`

      const body: Record<string, string> = { subject, contentMD, hashtag, mUrl }
      if (mode === 'edit') {
        body.actstatus = actstatus
      }

      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      router.push('/admin?tab=ourvoice')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Link
        href="/admin?tab=ourvoice"
        className="inline-flex items-center gap-2 text-[#1DADDF] hover:text-[#1898C7] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Our Voice
      </Link>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#344054] mb-1.5">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="contentMD" className="block text-sm font-medium text-[#344054]">
              Content (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-1.5 text-xs text-[#667085] hover:text-[#344054]"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
          {showPreview ? (
            <div className="min-h-[200px] p-4 border border-[#D0D5DD] rounded-lg bg-white">
              <MarkdownRenderer content={contentMD} />
            </div>
          ) : (
            <textarea
              id="contentMD"
              value={contentMD}
              onChange={e => setContentMD(e.target.value)}
              required
              rows={12}
              className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
            />
          )}
        </div>

        {/* Hashtag */}
        <div>
          <label htmlFor="hashtag" className="block text-sm font-medium text-[#344054] mb-1.5">
            Hashtag
          </label>
          <input
            id="hashtag"
            type="text"
            value={hashtag}
            onChange={e => setHashtag(e.target.value)}
            placeholder="#community"
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
          />
        </div>

        {/* Video URL */}
        <div>
          <label htmlFor="mUrl" className="block text-sm font-medium text-[#344054] mb-1.5">
            Video URL
          </label>
          <input
            id="mUrl"
            type="url"
            value={mUrl}
            onChange={e => setMUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
          />
        </div>

        {/* Status (edit only) */}
        {mode === 'edit' && (
          <div>
            <label htmlFor="actstatus" className="block text-sm font-medium text-[#344054] mb-1.5">
              Status
            </label>
            <select
              id="actstatus"
              value={actstatus}
              onChange={e => setActstatus(e.target.value)}
              className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
            >
              <option value="Y">Active</option>
              <option value="N">Inactive</option>
            </select>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#1DADDF] text-white text-sm font-medium rounded-lg hover:bg-[#1898C7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Save Changes'}
          </button>
          <Link
            href="/admin?tab=ourvoice"
            className="px-6 py-2.5 border border-[#D0D5DD] text-sm font-medium rounded-lg text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
