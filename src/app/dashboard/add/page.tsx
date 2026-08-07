'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AddPromptPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Marketing',
    aiTool: 'ChatGPT',
    difficulty: 'Beginner',
    visibility: 'Public',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Prompt created successfully!');
        router.push('/dashboard/prompts');
      } else {
        toast.error(data.message || 'Failed to create prompt');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New Prompt</h1>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6 glass">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Title</label>
          <input 
            type="text" 
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Ultimate SEO Blog Post Generator"
            className="w-full bg-black/30 border border-border rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Short Description</label>
          <textarea 
            required
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Explain what this prompt does..."
            className="w-full bg-black/30 border border-border rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Prompt Content</label>
          <textarea 
            required
            rows={5}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Paste your exact AI prompt text here..."
            className="w-full bg-black/30 border border-border rounded-xl p-3 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">AI Tool</label>
            <select
              value={formData.aiTool}
              onChange={(e) => setFormData({ ...formData, aiTool: e.target.value })}
              className="w-full bg-black/30 border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary"
            >
              <option value="ChatGPT">ChatGPT</option>
              <option value="Midjourney">Midjourney</option>
              <option value="Claude">Claude</option>
              <option value="Gemini">Gemini</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-black/30 border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary"
            >
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
              <option value="Writing">Writing</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full bg-black/30 border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Pro">Pro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Visibility</label>
            <select
              value={formData.visibility}
              onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              className="w-full bg-black/30 border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary"
            >
              <option value="Public">Public (Free for all)</option>
              <option value="Private">Private (Premium Users Only)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 mt-4"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <PlusSquare className="w-5 h-5" />
              Publish Prompt
            </>
          )}
        </button>
      </form>
    </div>
  );
}
