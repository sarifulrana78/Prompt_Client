'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Flag, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

export default function ReportPromptPage() {
  const router = useRouter();
  const params = useParams();
  const promptId = params?.id as string;
  const [reason, setReason] = useState('Inappropriate Content');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptId) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId, reason, description }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Report submitted successfully');
        router.back();
      } else {
        toast.error(data.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Flag className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-semibold">Report this Prompt</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-black/30 border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary"
            >
              <option>Inappropriate Content</option>
              <option>Spam</option>
              <option>Copyright Violation</option>
              <option>Low Quality</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-black/30 border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary"
              placeholder="Add additional details for the review team."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : <> <Send className="w-4 h-4" /> Submit Report</>}
          </button>
        </form>
      </div>
    </div>
  );
}
