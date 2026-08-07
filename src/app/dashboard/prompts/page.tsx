'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Plus, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPrompts();
  }, []);

  const fetchMyPrompts = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/my-prompts`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setPrompts(data.prompts || []);
      }
    } catch (err) {
      console.error('Error fetching my prompts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prompt?')) return;
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Prompt deleted');
        setPrompts(prompts.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting prompt');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Prompts</h1>
        <Link href="/dashboard/add" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Prompt
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading prompts...
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-gray-400 mb-4">You haven't created any prompts yet.</p>
          <Link href="/dashboard/add" className="text-primary hover:underline text-sm font-medium">
            Create your first prompt &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.map((prompt) => (
            <div key={prompt._id} className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
                    {prompt.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {prompt.visibility}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{prompt.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{prompt.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <span className="text-xs text-gray-500">{prompt.copyCount || 0} copies</span>
                <div className="flex items-center gap-2">
                  <Link href={`/prompt/${prompt._id}`} className="text-xs text-gray-300 hover:text-white px-2 py-1 bg-white/5 rounded">
                    View
                  </Link>
                  <button onClick={() => handleDelete(prompt._id)} className="p-1 text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
