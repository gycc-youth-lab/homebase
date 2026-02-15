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
