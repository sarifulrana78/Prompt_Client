'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import PromptCard from '@/components/PromptCard';

const API_BASE = '/api';

type PromptListItem = {
  _id: string;
  title: string;
  category?: string;
  aiTool?: string;
  copyCount?: number;
  description?: string;
  creator?: { name?: string; photoURL?: string; image?: string };
};

function PromptsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [aiTool, setAiTool] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prompts, setPrompts] = useState<PromptListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const loadPrompts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (category) params.append('category', category);
        if (aiTool) params.append('aiTool', aiTool);
        if (difficulty) params.append('difficulty', difficulty);
        if (sortBy) params.append('sort', sortBy);
        params.append('page', page.toString());
        params.append('limit', '9');

        const res = await fetch(`${API_BASE}/prompts?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setPrompts(data.prompts || []);
          setTotalPages(data.totalPages || 1);
        } else {
          setPrompts([]);
        }
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
        setPrompts([]);
      } finally {
        setLoading(false);
      }
    };

    void loadPrompts();
  }, [searchTerm, category, aiTool, difficulty, sortBy, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore Prompts</h1>
          <p className="text-gray-400">Find the perfect prompt for your next project</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search prompts..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              <button 
                onClick={() => {
                  setCategory('');
                  setAiTool('');
                  setDifficulty('');
                  setSortBy('latest');
                  setSearchTerm('');
                  setPage(1);
                }}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-6">
              {/* Sort By */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Sort By</h4>
                <select 
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  className="w-full bg-black/30 border border-border rounded-lg p-2 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="copies">Most Copied</option>
                </select>
              </div>

              {/* AI Tool */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">AI Tool</h4>
                <div className="space-y-2">
                  {['All', 'ChatGPT', 'Midjourney', 'Claude', 'Gemini'].map((tool) => (
                    <label key={tool} className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300">
                      <input 
                        type="radio" 
                        name="aiTool"
                        checked={aiTool === (tool === 'All' ? '' : tool)}
                        onChange={() => { setAiTool(tool === 'All' ? '' : tool); setPage(1); }}
                        className="accent-primary"
                      />
                      {tool}
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Category</h4>
                <div className="space-y-2">
                  {['All', 'Marketing', 'Development', 'Writing', 'Design', 'Business'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300">
                      <input 
                        type="radio" 
                        name="category"
                        checked={category === (cat === 'All' ? '' : cat)}
                        onChange={() => { setCategory(cat === 'All' ? '' : cat); setPage(1); }}
                        className="accent-primary"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {['All', 'Beginner', 'Intermediate', 'Pro'].map((level) => (
                    <label key={level} className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300">
                      <input 
                        type="radio" 
                        name="difficulty"
                        checked={difficulty === (level === 'All' ? '' : level)}
                        onChange={() => { setDifficulty(level === 'All' ? '' : level); setPage(1); }}
                        className="accent-primary"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Prompts Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <p>Loading prompts...</p>
            </div>
          ) : prompts.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
              <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {
                  setCategory(''); setAiTool(''); setDifficulty(''); setSortBy('latest'); setSearchTerm(''); setPage(1);
                }}
                className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt) => (
                <PromptCard 
                  key={prompt._id}
                  id={prompt._id}
                  title={prompt.title}
                  category={prompt.category}
                  aiTool={prompt.aiTool}
                  copyCount={prompt.copyCount || 0}
                  creatorName={prompt.creator?.name || 'Anonymous'}
                  creatorPhoto={prompt.creator?.photoURL || prompt.creator?.image}
                />
              ))}
            </div>
          )}

          {/* Interactive Pagination */}
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
        </main>
      </div>
    </div>
  );
}

export default function AllPromptsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
        <p>Loading prompts...</p>
      </div>
    }>
      <PromptsContent />
    </Suspense>
  );
}
