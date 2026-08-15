'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, PlusCircle, Loader2, Eye, Edit, BarChart2, Lock, Unlock, Star, X } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

type MyPromptListItem = {
  _id: string;
  title: string;
  category?: string;
  visibility?: string;
  aiTool?: string;
  status?: string;
  rejectionReason?: string;
  description?: string;
  copyCount?: number;
};

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<MyPromptListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsPrompt, setStatsPrompt] = useState<MyPromptListItem | null>(null);

  useEffect(() => {
    const loadMyPrompts = async () => {
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

    void loadMyPrompts();
  }, []);

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
    } catch (error) {
      console.error(error);
      toast.error('Error deleting prompt');
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#10b981] border border-[#10b981]/30 rounded-full bg-[#10b981]/10 flex items-center justify-center w-24">APPROVED</span>;
      case 'rejected':
        return <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ef4444] border border-[#ef4444]/30 rounded-full bg-[#ef4444]/10 flex items-center justify-center w-24">REJECTED</span>;
      default:
        return <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f59e0b] border border-[#f59e0b]/30 rounded-full bg-[#f59e0b]/10 flex items-center justify-center w-24">PENDING</span>;
    }
  };

  return (
    <div className="max-w-[1200px] text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Prompt Templates</h1>
          <p className="text-gray-400 text-sm">Review approval statuses, change details, and check analytics.</p>
        </div>
        <Link href="/dashboard/add" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
          <PlusCircle className="w-4 h-4" /> Create New Prompt
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#8b5cf6] mr-2" /> Loading prompts...
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-16 bg-[#11131e] border border-white/5 rounded-2xl">
          <p className="text-gray-400 mb-4">You haven&apos;t created any prompts yet.</p>
          <Link href="/dashboard/add" className="text-[#8b5cf6] hover:underline text-sm font-medium">
            Create your first prompt &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-[#11131e] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-[10px] uppercase text-gray-500 bg-[#1a1b2e] border-b border-white/5 font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">TITLE</th>
                  <th className="px-6 py-4">AI ENGINE</th>
                  <th className="px-6 py-4">VISIBILITY</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4">COPIES</th>
                  <th className="px-6 py-4">RATING</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {prompts.map((prompt) => (
                  <tr key={prompt._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white mb-1">{prompt.title}</div>
                      <div className="text-xs text-gray-500 mb-1">Category: {prompt.category || 'Other'}</div>
                      {prompt.status === 'rejected' && prompt.rejectionReason && (
                        <div className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded inline-block mt-1 border border-red-500/20">
                          Feedback: {prompt.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#a78bfa] bg-[#3b0764]/40 rounded-full border border-[#8b5cf6]/20">
                        {prompt.aiTool || 'ChatGPT'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        {prompt.visibility === 'Private' ? (
                          <><Lock className="w-3.5 h-3.5" /> Private</>
                        ) : (
                          <><Unlock className="w-3.5 h-3.5" /> Public</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(prompt.status)}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {prompt.copyCount || 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-white">
                        <Star className="w-3.5 h-3.5 fill-white" /> 0.0
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/prompt/${prompt._id}`} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/dashboard/prompts/edit/${prompt._id}`} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setStatsPrompt(prompt)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                          <BarChart2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(prompt._id)} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors border border-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {statsPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <BarChart2 className="w-5 h-5 text-[#8b5cf6]" /> Analytics
              </h3>
              <button onClick={() => setStatsPrompt(null)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-1">Prompt Title</p>
              <p className="text-white font-medium">{statsPrompt.title}</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#1a1b2e] border border-white/5 rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-400">Total Copies</span>
                <span className="text-2xl font-bold text-white">{statsPrompt.copyCount || 0}</span>
              </div>
              <div className="bg-[#1a1b2e] border border-white/5 rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-400">Visibility</span>
                <span className="font-medium text-white">{statsPrompt.visibility || 'Public'}</span>
              </div>
              <div className="bg-[#1a1b2e] border border-white/5 rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-400">Current Status</span>
                {getStatusBadge(statsPrompt.status)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
