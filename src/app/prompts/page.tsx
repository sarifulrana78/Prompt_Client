'use client';

import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import PromptCard from '@/components/PromptCard';

export default function AllPromptsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [aiTool, setAiTool] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for UI demonstration
  const mockPrompts = Array(9).fill({
    id: '1',
    title: 'Professional Resume & Cover Letter Generator',
    category: 'Career',
    aiTool: 'ChatGPT',
    copyCount: 342,
    creatorName: 'Sarah Jenkins',
  });

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  onChange={(e) => setSortBy(e.target.value)}
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
                        onChange={() => setAiTool(tool === 'All' ? '' : tool)}
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
                        onChange={() => setCategory(cat === 'All' ? '' : cat)}
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
                        onChange={() => setDifficulty(level === 'All' ? '' : level)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPrompts.map((prompt, index) => (
              <PromptCard 
                key={index} 
                {...prompt}
                id={`mock-${index}`}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-50">
                &larr;
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors">
                3
              </button>
              <span className="text-gray-500">...</span>
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-50">
                &rarr;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
