'use client';

import { useState, useEffect } from 'react';
import { List, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

type AdminPrompt = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  aiTool?: string;
  visibility?: string;
  status?: string;
  creator?: { name?: string };
};

const API_BASE = '/api';

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState<AdminPrompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/prompts`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setPrompts(data.prompts || []);
        } else {
          toast.error(data.message || 'Failed to load prompts');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching prompts');
      } finally {
        setLoading(false);
      }
    };

    void loadPrompts();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE}/admin/prompts/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Prompt ${status}`);
        setPrompts(prompts.map((prompt) => prompt._id === id ? { ...prompt, status } : prompt));
      } else {
        toast.error(data.message || 'Failed to update prompt status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating prompt status');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <List className="w-8 h-8 text-primary" />
        All Platform Prompts
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading prompts...
        </div>
      ) : prompts.length === 0 ? (
        <div className="bg-card border border-border p-8 rounded-2xl text-center text-gray-400">
          No prompts found.
        </div>
      ) : (
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div key={prompt._id} className="bg-card border border-border rounded-3xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">{prompt.category}</span>
                    <span className="text-xs bg-white/5 text-gray-300 px-2.5 py-1 rounded-full">{prompt.aiTool}</span>
                    <span className="text-xs bg-white/5 text-gray-300 px-2.5 py-1 rounded-full">{prompt.visibility}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">{prompt.title}</h2>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{prompt.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span>Status: <strong className="text-white">{prompt.status}</strong></span>
                    <span>Creator: <strong className="text-white">{prompt.creator?.name || 'Unknown'}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateStatus(prompt._id, 'approved')}
                    className="inline-flex items-center gap-2 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 px-4 py-2 text-sm transition-colors hover:bg-green-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(prompt._id, 'rejected')}
                    className="inline-flex items-center gap-2 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 px-4 py-2 text-sm transition-colors hover:bg-red-500/20"
                  >
                    <XCircle className="w-4 h-4" /> Reject
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
