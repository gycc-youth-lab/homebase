# NextAuth Google OAuth + MongoDB Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Google OAuth authentication restricted to `@gyccyouthlab.org` emails, with session persistence in MongoDB, protecting blog mutation endpoints.

**Architecture:** NextAuth v5 with MongoDB Adapter. Auth config in `src/lib/auth.ts`, catch-all route handler at `/api/auth/[...nextauth]`, session provider wrapping the app in root layout. Middleware protects future `/admin` routes. API route helpers gate POST/PUT/DELETE on blog endpoints.

**Tech Stack:** next-auth@beta, @auth/mongodb-adapter, Google OAuth 2.0, MongoDB (existing `gycc` database)

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install next-auth and MongoDB adapter**

Run: `npm install next-auth@beta @auth/mongodb-adapter`

**Step 2: Verify installation**

Run: `npm ls next-auth @auth/mongodb-adapter`
Expected: Both packages listed without errors

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add next-auth and mongodb adapter dependencies"
```

---

### Task 2: Create Auth Configuration

**Files:**
- Create: `src/lib/auth.ts`
- Modify: `src/lib/mongodb.ts` (no changes needed — already exports `clientPromise`)

**Step 1: Create `src/lib/auth.ts`**

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email?.endsWith("@gyccyouthlab.org") ?? false;
      }
      return false;
    },
  },
  pages: {
    error: "/auth/error",
  },
});
```

**Step 2: Commit**

```bash
git add src/lib/auth.ts
git commit -m "feat: add NextAuth config with Google provider and email restriction"
```

---

### Task 3: Create Auth API Route

**Files:**
- Create: `src/app/api/auth/[...nextauth]/route.ts`

**Step 1: Create the catch-all route handler**

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

**Step 2: Commit**

```bash
git add src/app/api/auth/\[...nextauth\]/route.ts
git commit -m "feat: add NextAuth catch-all API route"
```

---

### Task 4: Create Auth Error Page

**Files:**
- Create: `src/app/auth/error/page.tsx`

**Step 1: Create a simple error page for rejected logins**

```tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-2xl font-bold text-[#182230] mb-4">
        Authentication Error
      </h1>
      <p className="text-[#475467] mb-6 max-w-md">
        {error === "AccessDenied"
          ? "Access is restricted to @gyccyouthlab.org email addresses. Please sign in with your organization account."
          : "Something went wrong during sign in. Please try again."}
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/auth/error/page.tsx
git commit -m "feat: add auth error page for rejected logins"
```

---

### Task 5: Add Session Provider and Update Layout

**Files:**
- Create: `src/components/SessionProvider.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create SessionProvider wrapper**

```tsx
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

**Step 2: Wrap root layout with SessionProvider**

In `src/app/layout.tsx`, import `SessionProvider` and wrap the body content:

```tsx
import SessionProvider from "@/components/SessionProvider";

// ... existing code ...

// Inside the return, wrap HeroUIProvider with SessionProvider:
<SessionProvider>
  <HeroUIProvider>
    <Navbar />
    <Container className="pt-16 flex-grow">
      {children}
    </Container>
    <Footer />
  </HeroUIProvider>
</SessionProvider>
```

**Step 3: Commit**

```bash
git add src/components/SessionProvider.tsx src/app/layout.tsx
git commit -m "feat: add SessionProvider to root layout"
```

---

### Task 6: Add Auth Buttons to Navbar

**Files:**
- Modify: `src/components/Navbar/Navbar.tsx`

**Step 1: Add sign-in/sign-out UI to the Navbar**

Import `useSession` and `signIn`/`signOut` from `next-auth/react`. After the desktop nav links div (around line 160), add an auth section:

- **Logged out:** Show a "Sign In" button
- **Logged in:** Show the user's name/avatar and a "Sign Out" button

For the desktop section, add after the nav links `</div>` closing tag (line 160):

```tsx
{/* Auth Section */}
<div className="flex items-center gap-3 ml-4">
  {status === "authenticated" && session?.user ? (
    <>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <button
        onClick={() => signOut()}
        className="text-sm font-medium text-[#475467] hover:text-[#182230] transition-colors"
      >
        Sign Out
      </button>
    </>
  ) : status === "unauthenticated" ? (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
    >
      Sign In
    </button>
  ) : null}
</div>
```

For the mobile section, add a similar block at the bottom of the mobile nav (before closing `</div>` of `py-6 space-y-6 pb-24`):

```tsx
{/* Mobile Auth */}
<div className="pt-4 border-t border-[#EAECF0]">
  {status === "authenticated" && session?.user ? (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm text-[#475467]">{session.user.name}</span>
      </div>
      <button
        onClick={() => { signOut(); setIsOpen(false); }}
        className="text-sm font-medium text-[#475467] hover:text-[#182230]"
      >
        Sign Out
      </button>
    </div>
  ) : status === "unauthenticated" ? (
    <button
      onClick={() => { signIn("google"); setIsOpen(false); }}
      className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity"
    >
      Sign In
    </button>
  ) : null}
</div>
```

**Step 2: Commit**

```bash
git add src/components/Navbar/Navbar.tsx
git commit -m "feat: add sign-in/sign-out buttons to Navbar"
```

---

### Task 7: Protect Blog API Mutation Routes

**Files:**
- Modify: `src/app/api/blog/route.ts` (POST handler)
- Modify: `src/app/api/blog/[id]/route.ts` (PUT, DELETE handlers)

**Step 1: Add auth guard to blog POST**

At the top of the `POST` function in `src/app/api/blog/route.ts`, add session check:

```typescript
import { auth } from "@/lib/auth";

// Inside POST handler, before any logic:
const session = await auth();
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

**Step 2: Add auth guard to blog PUT and DELETE**

Same pattern in `src/app/api/blog/[id]/route.ts` — add session check at the top of both `PUT` and `DELETE` functions.

**Step 3: Commit**

```bash
git add src/app/api/blog/route.ts src/app/api/blog/\[id\]/route.ts
git commit -m "feat: protect blog mutation endpoints with auth"
```

---

### Task 8: Update Middleware for Future Admin Routes

**Files:**
- Modify: `src/middleware.ts`

**Step 1: Update middleware to use NextAuth**

Replace the existing middleware with:

```typescript
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*"],
};
```

This ensures `/admin/*` routes require authentication. All other routes remain public.

**Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: update middleware to protect admin routes"
```

---

### Task 9: Verify Build

**Step 1: Run the build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Run dev server and test manually**

Run: `npm run dev`
- Visit `http://localhost:3000` — public pages load normally
- Click "Sign In" — redirects to Google OAuth
- Sign in with non-`@gyccyouthlab.org` email — redirected to error page
- Sign in with `@gyccyouthlab.org` email — redirected home, shows avatar + Sign Out

**Step 3: Final commit if any fixes needed**
