'use client';

import Link from 'next/link';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl text-center bg-card border border-border rounded-3xl p-12 shadow-xl">
        <p className="text-primary font-semibold uppercase tracking-[0.3em] mb-4">Something went wrong</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Oops!</h1>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred while loading this page.
          Please refresh or head back to the home page.
        </p>
        <div className="text-xs text-gray-500 mb-6 break-words">{error.message}</div>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-black rounded-full font-semibold transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
