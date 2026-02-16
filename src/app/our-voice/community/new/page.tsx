'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/Container'
import RichTextEditor from '@/components/RichTextEditor'
import { ArrowLeft } from 'lucide-react'
import TurndownService from 'turndown'

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
})

// Preserve YouTube iframes as plain URLs in markdown
turndown.addRule('youtube-iframe', {
  filter: (node) =>
    node.nodeName === 'DIV' &&
    node.getAttribute('data-youtube-video') !== null,
  replacement: (_content, node) => {
    const iframe = (node as HTMLElement).querySelector('iframe')
    const src = iframe?.getAttribute('src') || ''
    const match = src.match(/\/embed\/([^?]+)/)
    if (match) {
      return `\n\nhttps://www.youtube.com/watch?v=${match[1]}\n\n`
    }
    return ''
  },
})

export default function NewCommunityPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [editorHtml, setEditorHtml] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (status === 'loading') {
    return (
      <main className="min-h-screen py-24">
        <Container>
          <div className="text-center text-[#667085]">Loading...</div>
        </Container>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="min-h-screen py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#101828] mb-4">Sign in required</h1>
            <p className="text-[#475467] mb-6">You need to be signed in to create a post.</p>
            <Link
              href="/our-voice/community"
              className="inline-flex items-center gap-2 text-[#1DADDF] hover:text-[#1898C7]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Community
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const contentMD = turndown.turndown(editorHtml)

      const res = await fetch('/api/ourvoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          contentMD,
          hashtag,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create post')
      }

      router.push('/our-voice/community')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/our-voice/community"
            className="inline-flex items-center gap-2 text-[#1DADDF] hover:text-[#1898C7] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Community
          </Link>

          <h1 className="text-3xl font-bold text-[#101828] mb-8">Create a New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#344054] mb-1.5">
                Title
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Give your post a title..."
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-1.5">
                Content
              </label>
              <RichTextEditor content="" onChange={setEditorHtml} />
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
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="#community"
                className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1DADDF] focus:border-transparent"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-[#1DADDF] text-white text-sm font-medium rounded-lg hover:bg-[#1898C7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Publishing...' : 'Publish Post'}
              </button>
              <Link
                href="/our-voice/community"
                className="px-6 py-2.5 border border-[#D0D5DD] text-sm font-medium rounded-lg text-[#344054] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </main>
  )
}
