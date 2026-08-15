'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Star, Copy, Bookmark, Flag, ChevronLeft, Loader2, Send, X, Tag, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSession } from '@/lib/auth-client';

const API_BASE = '/api';

type PromptCreator = {
  _id: string;
  name?: string;
  email?: string;
  photoURL?: string;
  image?: string;
  role?: string;
};

type PromptContent = {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  aiTool: string;
  difficulty: string;
  visibility: string;
  tags?: string[];
  copyCount?: number;
  bookmarkedBy?: string[];
  creator?: PromptCreator;
  createdAt?: string;
};

type ReviewItem = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name?: string;
    photoURL?: string;
    email?: string;
  };
};

const REPORT_REASONS = [
  'Inappropriate Content',
  'Spam',
  'Copyright Violation',
  'Misleading Information',
  'Harassment',
  'Other',
];

export default function PromptDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [prompt, setPrompt] = useState<PromptContent | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [isPending, session, router]);
  
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  // Review form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Report modal
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const loadPrompt = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/prompts/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          const promptData = data.prompt as PromptContent;
          setPrompt(promptData);
          setIsLocked(data.isLocked || false);

          const userId = (session?.user as { id?: string } | undefined)?.id;
          if (userId && promptData.bookmarkedBy?.includes(userId)) {
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

    void (async () => {
      await loadPrompt();
      await fetchReviews();
    })();
  }, [fetchReviews, id, session?.user]);

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await fetch(`${API_BASE}/prompts/${id}/copy`, { method: 'POST', credentials: 'include' });
      navigator.clipboard.writeText(prompt.content);
      toast.success('Prompt copied to clipboard!');
      setPrompt((prev) => prev ? { ...prev, copyCount: (prev.copyCount || 0) + 1 } : prev);
    } catch (error) {
      console.error(error);
      toast.error('Failed to copy prompt');
    }
  };

  const toggleBookmark = async () => {
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/bookmark`, { method: 'POST', credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setIsBookmarked(data.isBookmarked);
        toast.success(data.isBookmarked ? 'Prompt bookmarked!' : 'Bookmark removed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update bookmark');
    }
  };

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error('Please select a reason');
      return;
    }
    setSubmittingReport(true);
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: reportReason, description: reportDesc }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Report submitted. Thank you for keeping the platform safe!');
        setReportOpen(false);
        setReportReason('');
        setReportDesc('');
      } else {
        toast.error(data.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting report');
    } finally {
      setSubmittingReport(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_BASE}/prompts/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: newRating, comment: newComment }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Review submitted successfully!');
        setNewComment('');
        setNewRating(5);
        fetchReviews(); // Refresh reviews
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#8b5cf6] mb-2" />
        <p>Loading prompt details...</p>
      </div>
    );
  }

  if (!prompt) {
    if (!isPending && !session) {
      return (
        <div className="container mx-auto px-4 py-32 text-center max-w-lg">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-8">You need to be logged in to view prompt details.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="px-6 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium rounded-xl transition-colors">
              Login to Account
            </Link>
            <Link href="/prompts" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors">
              Back to Prompts
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Prompt Not Found</h2>
        <Link href="/prompts" className="text-[#8b5cf6] hover:underline">
          &larr; Back to all prompts
        </Link>
      </div>
    );
  }

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Report Modal */}
      {reportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <Flag className="w-5 h-5 text-red-400" /> Report Prompt
              </h3>
              <button onClick={() => setReportOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Reason *</label>
                <div className="space-y-2">
                  {REPORT_REASONS.map((reason) => (
                    <label key={reason} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={reportReason === reason}
                        onChange={() => setReportReason(reason)}
                        className="accent-[#8b5cf6]"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Details (Optional)</label>
                <textarea
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  placeholder="Provide any additional context..."
                  rows={3}
                  className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setReportOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/5 text-gray-300 hover:bg-white/5 text-sm transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submittingReport} className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 text-sm font-medium transition-colors disabled:opacity-50">
                  {submittingReport ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold text-white">{prompt.title}</h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={toggleBookmark}
                    className={`p-2.5 rounded-xl border border-white/5 bg-[#1a1b2e] hover:bg-white/5 transition-colors ${isBookmarked ? 'text-[#8b5cf6]' : 'text-gray-400'}`}
                    title="Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => setReportOpen(true)}
                    className="p-2.5 rounded-xl border border-white/5 bg-[#1a1b2e] hover:bg-white/5 transition-colors text-gray-400"
                    title="Report"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-400">{prompt.description}</p>
            </div>

            {/* Prompt Template Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Prompt Template</h3>
              
              {isLocked ? (
                <div className="bg-[#0a0b10] border border-white/5 rounded-xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[250px] text-center shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
                  {/* Blurred text background */}
                  <div className="absolute inset-0 p-6 blur-[6px] opacity-10 select-none font-mono text-sm text-gray-300 pointer-events-none break-all overflow-hidden">
                    {prompt.content.repeat(10)}
                  </div>
                  
                  {/* Overlay content */}
                  <div className="relative z-10 flex flex-col items-center max-w-md">
                    <h4 className="text-2xl font-bold text-white mb-3">Premium Prompt Content Locked</h4>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                      Unlock access to this prompt, review options, and duplicate copies for a one-time upgrade.
                    </p>
                    <Link href="/checkout" className="bg-[#06b6d4] hover:bg-[#0891b2] text-black px-8 py-3 rounded-full font-bold transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                      Subscribe to Premium ($5)
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0a0b10] border border-white/5 rounded-xl relative overflow-hidden">
                  <div className="flex items-center justify-end p-2 bg-[#1a1b2e] border-b border-white/5">
                    <button onClick={handleCopy} className="flex items-center gap-2 text-xs font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors text-white">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                  </div>
                  <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {prompt.content}
                  </div>
                </div>
              )}
            </div>

            {/* Usage Instructions Section (Static placeholder if none exists) */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Usage Instructions</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                For best results, configure your parameters on {prompt.aiTool} with low temperature (0.3 - 0.5) to avoid hallucinations. Replace bracketed tags in the template with your target topic details.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column / Sidebar */}
        <div>
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8">
            <h3 className="font-bold text-white mb-6">Prompt Details</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">AI Engine</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d8b4fe] bg-[#3b0764]/50 border border-[#6b21a8]/50 px-2.5 py-1 rounded-full">
                  {prompt.aiTool}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Category</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#5eead4] bg-[#134e4a]/50 border border-[#0f766e]/50 px-2.5 py-1 rounded-full">
                  {prompt.category}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Difficulty</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  {prompt.difficulty}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm pb-4 border-b border-white/5">
                <span className="text-gray-400">Visibility</span>
                <span className="text-sm text-white uppercase font-medium">{prompt.visibility}</span>
              </div>
              
              <div className="pt-2 space-y-4 pb-4 border-b border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Copies Made</span>
                  <span className="text-white font-medium">{prompt.copyCount || 0}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Bookmarks</span>
                  <span className="text-white font-medium">{prompt.bookmarkedBy?.length || 0}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Community Rating</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 
                    {averageRating} ({reviews.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Creator Information Box */}
            <div>
              <h3 className="font-bold text-white mb-6">Creator Information</h3>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#0ea5e9] p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#11131e] flex items-center justify-center text-gray-300 font-bold overflow-hidden relative">
                    {prompt.creator?.photoURL || prompt.creator?.image ? (
                      <Image src={prompt.creator?.photoURL || prompt.creator?.image || ''} alt={prompt.creator?.name || 'Creator'} fill className="object-cover" />
                    ) : (
                      <span className="text-xs">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{prompt.creator?.name || 'Creator'}</div>
                  <div className="text-xs text-gray-500">{prompt.creator?.email || 'creator@promptbase.com'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Community Reviews ({reviews.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Submit Review Box */}
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8 h-fit">
            <h3 className="text-lg font-bold text-white mb-6">Submit a Review</h3>
            {isLocked ? (
              <div className="bg-[#1a1b2e] border border-white/5 rounded-xl p-5 flex items-center gap-3">
                <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                <p className="text-sm text-gray-500">
                  Reviews are disabled for premium locked prompts.<br/>
                  Subscribe to premium to contribute feedback.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            newRating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Comment</label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this prompt..."
                    rows={4}
                    className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>

          {/* Display Reviews Box */}
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8 min-h-[250px]">
            {reviews.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                <svg viewBox="0 0 24 24" className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <p className="text-sm">No reviews submitted yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#0ea5e9] p-[1px]">
                          <div className="w-full h-full rounded-full bg-[#11131e] flex items-center justify-center overflow-hidden relative">
                            {review.user?.photoURL ? (
                              <Image src={review.user.photoURL} alt={review.user.name || 'User'} fill className="object-cover" />
                            ) : (
                              <span className="text-[10px] text-gray-300 font-bold">{review.user?.name?.charAt(0) || 'U'}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{review.user?.name || 'Anonymous'}</p>
                          <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              review.rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
