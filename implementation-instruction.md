# "Create a production-ready Next.js (App Router) web application with the following requirements:

1. **Core Tech Stack**
   - Next.js with TypeScript
   - Tailwind CSS with shadcn/ui
   - Supabase MCP (provided) for:
     - Relational data storage
     - Authentication (Supabase Auth)
     - Object storage (images, files)

2. **Design**
   - Use the provided Figma MCP for styling, typography, and component guidelines
   - Mobile-first responsive design
   - Dark/light mode toggle

3. **Features**
   - **Blog System**:
     - Public blog listing (`/blog`)
     - Individual post pages (`/blog/[slug]`)
     - Authenticated members can create/edit posts (`/blog/new`, `/blog/edit/[id]`)
     - Route protection so only authenticated users can write/edit posts
     - Posts stored in Supabase (`posts` table with title, slug, content, author_id, timestamps)
   - **Newsletter & Subscribers**:
     - Public signup form on landing page (`/`)
     - Store subscribers in separate `subscribers` table in Supabase (`id, email, name?, created_at`)
     - No authentication required for newsletter signups
   - **File Uploads**:
     - Authenticated users can upload images/files
     - Store uploads in Supabase storage, link in posts

4. **Project Setup**
   - Single Next.js project (not monorepo)
   - ESLint + Prettier for linting/formatting
   - `.env.example` with required variables (Supabase, Auth)
   - Deployment-ready for Vercel

5. **Scaffolding**
   - Pages:
     - `/` (Landing page with newsletter signup form)
     - `/blog` (List of posts)
     - `/blog/[slug]` (Single post page)
     - `/blog/new` (Protected route: create post)
     - `/blog/edit/[id]` (Protected route: edit post)
   - Components:
     - Navbar with sign-in/out
     - BlogPostCard
     - PostEditor (Markdown editor with image upload)
     - FileUploader (connected to Supabase storage)
     - NewsletterForm (stores data in `subscribers` table)
   - API routes:
     - `/api/blog` (CRUD for posts)
     - `/api/subscribe` (store new subscriber in Supabase)

6. **Migration Context**
   - Refer to the old site at: https://gyccyouthlab.org/
   - Only refer to legacy PHP code in directory: ./../gycc-php/ when needed.
   - Use these as references to:
     - Identify existing routes and their placement
     - Map old templates/components to new Next.js components
     - Preserve useful content/layout while modernizing design with Figma MCP
   - **IMPORTANT**: Follow AI agent exclusion rules defined in:
     - `.gitignore` - Standard version control exclusions
     - `.ai-agent-rules.md` - Human-readable AI agent behavior rules
     - `.ai-agent-config.json` - Machine-readable AI configuration
   - **DO NOT tokenize or analyze**:
     - `gycc-php/dbeditor/` directory (security sensitive database tools)
     - Media files (videos, images, audio) - track file paths only for Supabase upload mapping
     - Document files (PDFs, Office docs) - metadata extraction only
     - Any files/patterns listed in the above configuration files

7. **Extras**
   - README with setup + deployment instructions
   - Follow best practices for Next.js App Router, server components, and route protection
   - Clean and extensible file structure

Note: Notion MCP is only for internal task tracking during development, not for the app itself."