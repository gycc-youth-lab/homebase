'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import OurVoiceForm from '@/components/admin/OurVoiceForm'
import { DisplaySM } from '@/components/Typography'

interface PostData {
  id: string
  subject: string
  contentMD: string
  hashtag: string
  videoUrl: string | null
  actstatus: string
}

export default function EditOurVoicePage() {
  const params = useParams()
  const id = params?.id as string
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/admin/ourvoice/${id}`)
        if (!res.ok) throw new Error('Failed to fetch post')
        const data = await res.json()
        setPost(data.post)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  if (loading) {
    return <div className="text-center py-12 text-[#667085]">Loading...</div>
  }

  if (error || !post) {
    return <div className="text-center py-12 text-red-600">{error || 'Post not found'}</div>
  }

  return (
    <div>
      <DisplaySM weight="semibold" className="text-[#101828] mb-6">
        Edit Post
      </DisplaySM>
      <OurVoiceForm mode="edit" initialData={post} />
    </div>
  )
}
