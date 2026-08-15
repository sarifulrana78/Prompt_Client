'use client';

import { useState, useEffect } from 'react';
import { List, CheckCircle2, XCircle, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadPrompts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/admin/prompts?page=${page}&limit=10`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setPrompts(data.prompts || []);
          setTotalPages(data.totalPages || 1);
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
  }, [page]);

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

  const deletePrompt = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, delete it!',
      background: '#11131e',
      color: '#fff'
    });

    if (!result.isConfirmed) return;
    
    try {
      const res = await fetch(`${API_BASE}/admin/prompts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Prompt deleted successfully');
        setPrompts(prompts.filter(p => p._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete prompt');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting prompt');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20 px-4 py-2 text-sm transition-colors hover:bg-orange-500/20"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                  <button
                    onClick={() => deletePrompt(prompt._id)}
                    className="inline-flex items-center gap-2 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 px-4 py-2 text-sm transition-colors hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white"
                >
                  &larr;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-primary text-white shadow-lg'
                        : 'border border-border text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white"
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
