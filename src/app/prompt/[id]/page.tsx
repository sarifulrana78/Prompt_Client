'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Copy, Bookmark, Flag, ChevronLeft, Lock, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSession } from '@/lib/auth-client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function PromptDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: session } = useSession();

  const [prompt, setPrompt] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  // New review form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPrompt();
      fetchReviews();
    }
  }, [id]);

  const fetchPrompt = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setPrompt(data.prompt);
        setIsLocked(data.isLocked || false);
        if (session && data.prompt.bookmarkedBy?.includes((session.user as any).id)) {
          setIsBookmarked(true);
        }
      } else {
        toast.error(data.message || 'Prompt not found');
      }
    } catch (err) {
      console.error('Error fetching prompt:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await fetch(`${API_BASE}/prompts/${id}/copy`, { method: 'POST', credentials: 'include' });
      navigator.clipboard.writeText(prompt.content);
      toast.success('Prompt copied to clipboard!');
      setPrompt((prev: any) => ({ ...prev, copyCount: (prev?.copyCount || 0) + 1 }));
    } catch (err) {
      toast.error('Failed to copy prompt');
    }
  };

  const toggleBookmark = async () => {
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/bookmark`, { method: 'POST', credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setIsBookmarked(data.isBookmarked);
        toast.success(data.isBookmarked ? 'Prompt bookmarked' : 'Bookmark removed');
      }
    } catch (err) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: newRating, comment: newComment }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Review added!');
        setNewComment('');
        fetchReviews();
      } else {
        toast.error(data.message || 'Failed to add review');
      }
    } catch (err) {
      toast.error('Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
        <p>Loading prompt details...</p>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Prompt Not Found</h2>
        <Link href="/prompts" className="text-primary hover:underline">
          &larr; Back to all prompts
        </Link>
      </div>
    );
  }

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/prompts" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Prompts
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full font-medium border border-primary/20">
                {prompt.category}
              </span>
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                {prompt.aiTool}
              </span>
              <span className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                {prompt.difficulty}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{prompt.title}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {prompt.description}
            </p>
          </div>

          {/* Prompt Content Box */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Prompt Content
              </h3>
              {!isLocked && (
                <button onClick={handleCopy} className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors text-white">
                  <Copy className="w-4 h-4" /> Copy Prompt
                </button>
              )}
            </div>

            {isLocked ? (
              <div className="relative rounded-lg overflow-hidden bg-black/40 border border-border/50">
                <div className="p-4 blur-sm opacity-50 select-none font-mono text-sm text-gray-300">
                  {prompt.content}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-10 p-6 text-center">
                  <Lock className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-lg mb-2">Premium Prompt</h4>
                  <p className="text-sm text-gray-300 mb-4 max-w-xs">
                    Subscribe to Premium to unlock this prompt and copy it directly.
                  </p>
                  <Link href="/checkout" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-colors">
                    Upgrade to Premium
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                {prompt.content}
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-xl font-bold mb-6">Reviews & Ratings</h3>
            
            <div className="flex items-center gap-4 mb-8 bg-card border border-border p-6 rounded-xl">
              <div className="text-center pr-6 border-r border-border">
                <div className="text-4xl font-bold text-white mb-1">{averageRating}</div>
                <div className="flex gap-1 text-yellow-500 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-gray-400">{reviews.length} Ratings</div>
              </div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm">Community feedback on this AI prompt.</p>
              </div>
            </div>

            {/* Add Review Form */}
            {session && (
              <form onSubmit={handleAddReview} className="bg-card border border-border rounded-xl p-5 mb-8 space-y-4">
                <h4 className="font-semibold text-sm">Leave a Review</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`p-1 text-yellow-500 transition-transform ${star <= newRating ? 'scale-110' : 'opacity-30'}`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your review here..."
                    className="flex-1 bg-black/30 border border-border rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4" /> Submit
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No reviews yet. Be the first to leave one!</p>
              ) : (
                reviews.map((rev: any) => (
                  <div key={rev._id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                          {rev.user?.photoURL ? (
                            <img src={rev.user.photoURL} alt={rev.user.name} className="w-full h-full object-cover" />
                          ) : (
                            rev.user?.name?.charAt(0) || 'U'
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm">{rev.user?.name || 'User'}</div>
                          <div className="text-xs text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 text-yellow-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 border-b border-border pb-4">Creator Info</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center text-primary font-bold text-lg">
                  {prompt.creator?.photoURL || prompt.creator?.image ? (
                    <img src={prompt.creator?.photoURL || prompt.creator?.image} alt={prompt.creator?.name} className="w-full h-full object-cover" />
                  ) : (
                    prompt.creator?.name?.charAt(0) || 'C'
                  )}
                </div>
              </div>
              <div>
                <div className="font-bold text-white">{prompt.creator?.name || 'Anonymous'}</div>
                <div className="text-xs text-gray-400">{prompt.creator?.role || 'Creator'}</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 border-b border-border pb-4">Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Copies</span>
                <span className="font-medium text-white">{prompt.copyCount || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Visibility</span>
                <span className="font-medium text-white">{prompt.visibility}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Created</span>
                <span className="font-medium text-white">{new Date(prompt.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={toggleBookmark}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
                isBookmarked 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} /> 
              {isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
