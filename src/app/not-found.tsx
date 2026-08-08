'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl text-center bg-card border border-border rounded-3xl p-12 shadow-xl">
        <p className="text-primary font-semibold uppercase tracking-[0.3em] mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist or has been moved. Go back to the homepage to continue exploring AI prompts.
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-black rounded-full font-semibold transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
