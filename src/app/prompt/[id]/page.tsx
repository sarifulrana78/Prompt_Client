'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Copy, Bookmark, Flag, ChevronLeft, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PromptDetailsPage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLocked, setIsLocked] = useState(true); // Example for premium prompt
  
  const handleCopy = () => {
    navigator.clipboard.writeText("This is the premium prompt content...");
    toast.success('Prompt copied to clipboard!');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Bookmark removed' : 'Prompt bookmarked');
  };

  const handleReport = () => {
    toast.info('Report modal opened');
  };

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
                Marketing
              </span>
              <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                ChatGPT
              </span>
              <span className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                Intermediate
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Ultimate SEO Blog Post Generator</h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Create highly optimized, engaging blog posts that rank on the first page of Google. This prompt handles research, outline creation, and writing in a single shot.
            </p>
          </div>

          {/* Prompt Content Box */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Prompt Content
              </h3>
              {!isLocked && (
                <button onClick={handleCopy} className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" /> Copy
                </button>
              )}
            </div>

            {isLocked ? (
              <div className="relative rounded-lg overflow-hidden bg-black/40 border border-border/50">
                <div className="p-4 blur-sm opacity-50 select-none">
                  <p className="font-mono text-sm text-gray-300">
                    Act as an expert SEO copywriter and content strategist. Your goal is to write a comprehensive, highly engaging, and perfectly optimized blog post about [TOPIC]. 
                    <br/><br/>
                    First, create an outline with H2 and H3 tags. Then...
                  </p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-10">
                  <Lock className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-lg mb-2">Premium Prompt</h4>
                  <p className="text-sm text-gray-300 mb-4 text-center max-w-xs">
                    Subscribe to Premium to unlock this prompt and copy it directly.
                  </p>
                  <Link href="/pricing" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-colors">
                    Subscribe for $5
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                Act as an expert SEO copywriter and content strategist. Your goal is to write a comprehensive, highly engaging, and perfectly optimized blog post about [TOPIC].
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-xl font-bold mb-6">Reviews & Ratings</h3>
            
            <div className="flex items-center gap-4 mb-8 bg-card border border-border p-6 rounded-xl">
              <div className="text-center pr-6 border-r border-border">
                <div className="text-4xl font-bold text-white mb-1">4.9</div>
                <div className="flex gap-1 text-yellow-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs text-gray-400">128 Ratings</div>
              </div>
              <div className="flex-1">
                {/* Progress bars could go here */}
                <p className="text-gray-300 text-sm">Most users found this prompt highly effective for generating SEO content.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2].map((review) => (
                <div key={review} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        J
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">John D.</div>
                        <div className="text-xs text-gray-400">2 days ago</div>
                      </div>
                    </div>
                    <div className="flex gap-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    This prompt completely transformed how I write blog posts. It saves me hours of work and the output is incredibly high quality. Highly recommended!
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 border-b border-border pb-4">Creator Info</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-card overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Creator" />
                </div>
              </div>
              <div>
                <div className="font-bold text-white">Alex J.</div>
                <div className="text-xs text-gray-400">Top Creator • 45 Prompts</div>
              </div>
            </div>
            <Link href="#" className="block w-full py-2 text-center text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              View Profile
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 border-b border-border pb-4">Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Copies</span>
                <span className="font-medium text-white">1,245</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Views</span>
                <span className="font-medium text-white">8,432</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Created</span>
                <span className="font-medium text-white">Oct 12, 2023</span>
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
            <button 
              onClick={handleReport}
              className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium transition-colors"
            >
              <Flag className="w-4 h-4" /> Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
