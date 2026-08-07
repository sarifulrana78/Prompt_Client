'use client';

import { Flag } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Flag className="w-8 h-8 text-red-400" />
        Reported Prompts
      </h1>
      <div className="bg-card border border-border p-8 rounded-2xl text-center text-gray-400">
        Review prompts flagged by the community.
      </div>
    </div>
  );
}
