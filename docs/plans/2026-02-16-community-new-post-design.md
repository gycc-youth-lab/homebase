# Community New Post with TipTap WYSIWYG Editor

## Overview

Add a "New Post" button on `/our-voice/community` visible to logged-in users. Clicking it navigates to `/our-voice/community/new` where users can create posts using a TipTap WYSIWYG editor with image upload and YouTube embed support.

## Architecture

- **Route:** `/our-voice/community/new` (client-side, session-gated)
- **API:** `POST /api/ourvoice` (auth-protected, creates post with `actstatus: 'Y'`)
- **Upload API:** `POST /api/upload` (auth-protected, uploads images to MinIO)
- **Editor:** TipTap (headless WYSIWYG) with markdown output via `turndown`

## Components

### 1. "New Post" Button
- On `/our-voice/community/page.tsx`, visible only when session exists
- Links to `/our-voice/community/new`

### 2. New Post Page (`/our-voice/community/new/page.tsx`)
- Subject input, TipTap editor, hashtag input, submit button
- Redirects unauthenticated users

### 3. RichTextEditor (`src/components/RichTextEditor.tsx`)
- TipTap with toolbar: bold, italic, heading, lists, blockquote, code, link, image upload, YouTube embed
- Image upload: file picker -> POST /api/upload -> insert image node
- YouTube: prompt for URL -> insert embed node
- Outputs markdown via turndown (HTML->MD)

## Data Flow

### Post Creation
```
TipTap editor -> serialize HTML to markdown -> POST /api/ourvoice { subject, contentMD, hashtag }
-> MongoDB insert into `ourvoice` -> redirect to /our-voice/community
```

### Image Upload
```
File picker -> POST /api/upload (FormData) -> MinIO at htdocs-full/upload/editor_img/{uuid}-{filename}
-> Return presigned URL -> Insert image in editor
```

## Packages
- `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-youtube`, `@tiptap/extension-link`, `@tiptap/pm`
- `turndown` + `@types/turndown`

## Files Changed/Created

| File | Action |
|------|--------|
| `src/app/our-voice/community/page.tsx` | Add session-gated "New Post" button |
| `src/app/our-voice/community/new/page.tsx` | New: post creation page |
| `src/components/RichTextEditor.tsx` | New: TipTap editor component |
| `src/app/api/ourvoice/route.ts` | Add POST handler (auth-protected) |
| `src/app/api/upload/route.ts` | New: image upload endpoint |

## Constraints
- Max image size: 5MB
- Posts publish immediately (actstatus: 'Y')
- Only @gyccyouthlab.org users can post (enforced by NextAuth)
- Images stored at MinIO path `htdocs-full/upload/editor_img/` matching existing pattern
