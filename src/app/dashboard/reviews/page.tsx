'use client';

import { MessageSquare } from 'lucide-react';

export default function MyReviewsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-primary" />
        My Reviews
      </h1>

      <div className="bg-card border border-border rounded-2xl p-8 text-center text-gray-400">
        <p>You can view and manage all your submitted reviews here.</p>
      </div>
    </div>
  );
}
