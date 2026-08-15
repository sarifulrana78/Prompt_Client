'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, Star, Calendar, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

type MyReviewItem = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  prompt?: {
    _id: string;
    title: string;
    category?: string;
    aiTool?: string;
  };
};

const getToolTagColors = (tool: string) => {
  switch (tool?.toLowerCase()) {
    case 'claude':
      return 'text-[#a78bfa] bg-[#3b0764]/50 border-[#6b21a8]/50'; // Purple
    case 'chatgpt':
      return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'; // Green
    case 'midjourney':
      return 'text-[#d8b4fe] border-[#7e22ce]/50 bg-[#581c87]/30'; // Darker purple
    default:
      return 'text-[#34d399] border-[#059669]/50 bg-[#064e3b]/30'; // Tealish green
  }
};

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<MyReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/my-reviews`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews || []);
        } else {
          toast.error(data.message || 'Failed to load reviews');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        toast.error('Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    void loadMyReviews();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">
        My Product Reviews
      </h1>
      <p className="text-gray-400 mb-8">Feedback and ratings you&apos;ve posted on the marketplace.</p>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#8b5cf6] mr-2" /> Loading your reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 bg-[#11131e] border border-white/5 rounded-xl">
          <p className="text-gray-400 mb-4">You haven&apos;t reviewed any prompts yet.</p>
          <Link href="/prompts" className="text-[#8b5cf6] hover:underline text-sm font-medium">
            Explore prompts to review &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-[#11131e] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest w-1/3">Prompt Title</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">AI Tool</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Rating</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Comments</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Submitted Date</th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reviews.map((rev) => (
                  <tr key={rev._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-white text-sm">
                        {rev.prompt?.title || 'Unknown Prompt'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {rev.prompt?.aiTool ? (
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${getToolTagColors(rev.prompt.aiTool)}`}>
                          {rev.prompt.aiTool}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {(rev.rating || 0).toFixed(1)}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-400 truncate max-w-[200px]" title={rev.comment}>
                        &quot;{rev.comment}&quot;
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {rev.prompt?._id && (
                        <Link
                          href={`/prompt/${rev.prompt._id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-white transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

