# Community New Post Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "New Post" button on `/our-voice/community` for logged-in users, with a TipTap WYSIWYG editor supporting rich text, image upload (to MinIO), and YouTube embeds.

**Architecture:** New page at `/our-voice/community/new` with a TipTap editor. Image uploads go through `POST /api/upload` to MinIO (`htdocs-full/upload/editor_img/`). Posts are created via `POST /api/ourvoice` and stored in the `ourvoice` MongoDB collection. HTML is converted to markdown via `turndown` for storage in `contentMD`.

**Tech Stack:** Next.js 15, React 19, TipTap, MinIO (S3-compatible), MongoDB, NextAuth, Tailwind CSS, turndown

---

### Task 1: Install TipTap and turndown dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install packages**

Run:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-youtube @tiptap/extension-link @tiptap/pm turndown
npm install -D @types/turndown
```

**Step 2: Verify installation**

Run: `npm ls @tiptap/react turndown`
Expected: Both packages listed without errors

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add tiptap editor and turndown dependencies"
```

---

### Task 2: Create image upload API route

**Files:**
- Create: `src/app/api/upload/route.ts`

This endpoint accepts a multipart form upload, validates it (image type, max 5MB), uploads to MinIO at the `htdocs-full/upload/editor_img/` prefix (matching the existing pattern in `src/app/api/ourvoice/[slug]/route.ts:41-51`), and returns the public URL.

**Step 1: Create the upload route**

Create `src/app/api/upload/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadObject, getPublicUrl } from '@/lib/minio'
import { randomUUID } from 'crypto'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      )
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${randomUUID()}.${ext}`
    const key = `htdocs-full/upload/editor_img/${filename}`

    const buffer = Buffer.from(await file.arrayBuffer())
    await uploadObject(key, buffer, file.type)

    const url = getPublicUrl(key)

    return NextResponse.json({ url })
  } catch (error: unknown) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add src/app/api/upload/route.ts
git commit -m "feat: add image upload API route for MinIO"
```

---

### Task 3: Add POST handler to public ourvoice API

**Files:**
- Modify: `src/app/api/ourvoice/route.ts`

The existing file at `src/app/api/ourvoice/route.ts` only has a GET handler. Add a POST handler that requires auth and creates a post. This mirrors the admin POST at `src/app/api/admin/ourvoice/route.ts:60-112` but is accessible from the community page.

**Step 1: Add POST handler**

Add this after the existing GET handler (after line 100) in `src/app/api/ourvoice/route.ts`:

```typescript
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { subject, contentMD, hashtag } = body

    if (!subject?.trim()) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      )
    }

    if (!contentMD?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    const newPost = {
      subject: subject.trim(),
      contentMD: contentMD.trim(),
      hashtag: hashtag?.trim() || '',
      mUrl: '',
      actstatus: 'Y',
      hit: 0,
      regdate: new Date(),
    }

    const result = await db.collection('ourvoice').insertOne(newPost)

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: { id: result.insertedId.toString(), ...newPost },
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Error creating ourvoice post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
```

Also add the `auth` import at the top of the file (add after the existing imports):

```typescript
import { auth } from '@/lib/auth'
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/api/ourvoice/route.ts
git commit -m "feat: add POST handler to public ourvoice API"
```

---

### Task 4: Create RichTextEditor component

**Files:**
- Create: `src/components/RichTextEditor.tsx`

This is the TipTap WYSIWYG editor with a toolbar. It matches the existing design system: `#1DADDF` accent color, `#D0D5DD` borders, `#344054`/`#667085` text colors (see `src/components/admin/OurVoiceForm.tsx` for reference).

**Step 1: Create the component**

Create `src/components/RichTextEditor.tsx`:

```tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import { useCallback, useRef } from 'react'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  ImageIcon,
  Youtube as YoutubeIcon,
  Undo,
  Redo,
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-[#1DADDF]/10 text-[#1DADDF]'
          : 'text-[#667085] hover:bg-[#F2F4F7] hover:text-[#344054]'
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Youtube.configure({ width: 640, height: 360 }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] px-4 py-3 outline-none prose prose-lg max-w-none [&_p]:mb-3 [&_p]:text-[#374151] [&_p]:leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#101828] [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#101828] [&_h3]:mt-5 [&_h3]:mb-2 [&_strong]:font-semibold [&_strong]:text-[#101828] [&_a]:text-[#1DADDF] [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-3 [&_blockquote]:border-l-4 [&_blockquote]:border-[#1DADDF] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#475467] [&_code]:bg-[#F2F4F7] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_pre]:bg-[#F2F4F7] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4',
      },
    },
  })

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const { url } = await res.json()
      editor.chain().focus().setImage({ src: url, alt: file.name }).run()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to upload image')
    }
  }, [editor])

  const onImageButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleImageUpload(file)
        e.target.value = ''
      }
    },
    [handleImageUpload]
  )

  const addYoutubeVideo = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter YouTube URL:')
    if (url) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }, [editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  const iconSize = 18

  return (
    <div className="border border-[#D0D5DD] rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#D0D5DD] bg-[#F9FAFB]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-6 bg-[#D0D5DD] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-6 bg-[#D0D5DD] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-6 bg-[#D0D5DD] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-6 bg-[#D0D5DD] mx-1" />

        <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="Link">
          <LinkIcon size={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={onImageButtonClick} title="Upload Image">
          <ImageIcon size={iconSize} />
        </ToolbarButton>
        <ToolbarButton onClick={addYoutubeVideo} title="YouTube Video">
          <YoutubeIcon size={iconSize} />
        </ToolbarButton>

        <div className="w-px h-6 bg-[#D0D5DD] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo size={iconSize} />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/RichTextEditor.tsx
git commit -m "feat: add TipTap rich text editor component"
```

---

### Task 5: Create the new post page

**Files:**
- Create: `src/app/our-voice/community/new/page.tsx`

This page uses `useSession()` to gate access, the `RichTextEditor` component, and `turndown` to convert HTML to markdown before submitting.

**Step 1: Create the page**

Create `src/app/our-voice/community/new/page.tsx`:

```tsx
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

// Preserve YouTube iframes as markdown-compatible text
turndown.addRule('youtube-iframe', {
  filter: (node) =>
    node.nodeName === 'DIV' &&
    node.getAttribute('data-youtube-video') !== null,
  replacement: (_content, node) => {
    const iframe = (node as HTMLElement).querySelector('iframe')
    const src = iframe?.getAttribute('src') || ''
    // Extract video ID from embed URL
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
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/our-voice/community/new/page.tsx
git commit -m "feat: add community new post page with rich text editor"
```

---

### Task 6: Add "New Post" button to community page

**Files:**
- Modify: `src/app/our-voice/community/page.tsx`

Add `useSession` from next-auth and a "New Post" button in the header area, visible only when session exists.

**Step 1: Add session import and button**

At the top of `src/app/our-voice/community/page.tsx`, add to the imports:

```typescript
import { useSession } from 'next-auth/react'
import { Plus } from 'lucide-react'
```

Note: `ChevronLeft` and `ChevronRight` are already imported from lucide-react — merge `Plus` into that import.

Inside the `CommunityPage` component, add after the existing state hooks:

```typescript
const { data: session } = useSession()
```

Replace the `{/* Header */}` section (the `<div className="text-center">` block) with:

```tsx
{/* Header */}
<div className="text-center">
  <DisplayMD weight="semibold" className="text-[#101828] mb-4">
    From Our Community
  </DisplayMD>
  <TextMD className="text-[#475467] max-w-2xl mx-auto">
    Hear the voices of young people from around the world sharing their perspectives on climate challenges and solutions.
  </TextMD>
  {session && (
    <div className="mt-6">
      <Link
        href="/our-voice/community/new"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1DADDF] text-white text-sm font-medium rounded-lg hover:bg-[#1898C7] transition-colors"
      >
        <Plus className="w-4 h-4" />
        New Post
      </Link>
    </div>
  )}
</div>
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/our-voice/community/page.tsx
git commit -m "feat: add session-gated New Post button on community page"
```

---

### Task 7: Build verification and manual test

**Step 1: Full build check**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds with no errors

**Step 2: Verify all files exist**

Run:
```bash
ls -la src/app/api/upload/route.ts src/components/RichTextEditor.tsx src/app/our-voice/community/new/page.tsx
```
Expected: All three files listed

**Step 3: Commit any remaining changes**

If there are lint fixes or small adjustments needed, commit them:
```bash
git add -A
git commit -m "chore: final cleanup for community new post feature"
```
