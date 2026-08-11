'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Star, Loader2, ArrowRight } from 'lucide-react';
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
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-primary" />
        My Submitted Reviews
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading your reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <p className="text-gray-400 mb-4">You haven&apos;t reviewed any prompts yet.</p>
          <Link href="/prompts" className="text-primary hover:underline text-sm font-medium">
            Explore prompts to review &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 pb-3 border-b border-border">
                <div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {rev.prompt?.category && (
                      <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full">
                        {rev.prompt.category}
                      </span>
                    )}
                    {rev.prompt?.aiTool && (
                      <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full">
                        {rev.prompt.aiTool}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-white">
                    {rev.prompt?.title || 'Unknown Prompt'}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1 text-yellow-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{rev.comment}</p>

              {rev.prompt?._id && (
                <div className="flex justify-end">
                  <Link
                    href={`/prompt/${rev.prompt._id}`}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                  >
                    View Prompt <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

