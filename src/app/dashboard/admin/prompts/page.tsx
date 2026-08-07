'use client';

import { List } from 'lucide-react';

export default function AdminPromptsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <List className="w-8 h-8 text-primary" />
        All Platform Prompts
      </h1>
      <div className="bg-card border border-border p-8 rounded-2xl text-center text-gray-400">
        Review and manage all prompt submissions across the platform.
      </div>
    </div>
  );
}
