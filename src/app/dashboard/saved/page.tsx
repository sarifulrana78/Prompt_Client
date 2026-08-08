'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, Bookmark } from 'lucide-react';
import PromptCard from '@/components/PromptCard';

const API_BASE = '/api';

type SavedPrompt = {
  _id: string;
  title: string;
  category?: string;
  aiTool?: string;
  copyCount?: number;
  creator?: { name?: string; photoURL?: string; image?: string };
};

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedPrompts = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/saved-prompts`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setPrompts(data.prompts || []);
        }
      } catch (err) {
        console.error('Error fetching saved prompts:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadSavedPrompts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Bookmark className="w-8 h-8 text-primary" />
        Saved Prompts
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading saved prompts...
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-gray-400 mb-4">You haven&apos;t bookmarked any prompts yet.</p>
          <Link href="/prompts" className="text-primary hover:underline text-sm font-medium">
            Explore prompts to save &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              id={prompt._id}
              title={prompt.title}
              category={prompt.category}
              aiTool={prompt.aiTool}
              copyCount={prompt.copyCount || 0}
              creatorName={prompt.creator?.name || 'Anonymous'}
              creatorPhoto={prompt.creator?.photoURL || prompt.creator?.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
