'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Upload } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

export default function AddPromptPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Idea Generation',
    aiTool: 'Stable Diffusion',
    difficulty: 'Beginner',
    visibility: 'Public',
    tags: '',
    thumbnail: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let thumbnailDataUrl = '';
      if (formData.thumbnail) {
        thumbnailDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(formData.thumbnail as File);
        });
      }

      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        thumbnail: thumbnailDataUrl || undefined,
      };

      const res = await fetch(`${API_BASE}/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Prompt submitted successfully!');
        router.push('/dashboard/prompts');
      } else {
        toast.error(data.message || 'Failed to create prompt');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] text-white">
      <h1 className="text-3xl font-bold mb-2">Create New Prompt Template</h1>
      <p className="text-gray-400 mb-8 text-sm">Fill in details to submit a prompt to the community catalog.</p>

      <form onSubmit={handleSubmit} className="bg-[#11131e] border border-white/5 rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Prompt Title *</label>
          <input 
            type="text" 
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Optimized React Tailwind Card Builder"
            className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Short Description *</label>
          <input 
            type="text"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Explain what this prompt accomplishes in 1-2 sentences"
            className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Prompt Content Template *</label>
          <textarea 
            required
            rows={5}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write the full, detailed prompt instructions. Use brackets to indicate variables e.g., 'Act as a [role]...'"
            className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]/50 appearance-none"
            >
              <option value="Idea Generation">Idea Generation</option>
              <option value="Coding">Coding</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
              <option value="Graphics & Image">Graphics & Image</option>
              <option value="System Assistant">System Assistant</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">AI Engine *</label>
            <select
              value={formData.aiTool}
              onChange={(e) => setFormData({ ...formData, aiTool: e.target.value })}
              className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]/50 appearance-none"
            >
              <option value="Stable Diffusion">Stable Diffusion</option>
              <option value="Midjourney">Midjourney</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="Gemini">Gemini</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Difficulty Level *</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]/50 appearance-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Pro">Pro</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Visibility Status *</label>
            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="visibility" 
                  value="Public"
                  checked={formData.visibility === 'Public'}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="w-4 h-4 text-[#8b5cf6] bg-[#1a1b2e] border-white/10 focus:ring-[#8b5cf6]"
                />
                <span className="text-sm text-gray-300">Public (Free access)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="visibility" 
                  value="Private"
                  checked={formData.visibility === 'Private'}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="w-4 h-4 text-[#8b5cf6] bg-[#1a1b2e] border-white/10 focus:ring-[#8b5cf6]"
                />
                <span className="text-sm text-gray-300">Private (Premium lock)</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tags (Comma-Separated)</label>
          <input 
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="e.g. react, tailwind, frontend"
            className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl p-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Thumbnail Image Upload</label>
          <label className="w-full border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-[#1a1b2e]/50 cursor-pointer hover:bg-[#1a1b2e] transition-colors group">
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({ ...formData, thumbnail: e.target.files[0] });
                }
              }}
            />
            {formData.thumbnail ? (
              <div className="text-center">
                <p className="text-sm text-[#8b5cf6] font-medium mb-1">{formData.thumbnail.name}</p>
                <p className="text-xs text-gray-500">Click to change file</p>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-500 mb-3 group-hover:text-[#8b5cf6] transition-colors" />
                <p className="text-sm text-white font-medium mb-1">Click to choose a thumbnail image file</p>
                <p className="text-xs text-gray-500">Supports PNG, JPG, or WEBP (Max 2MB)</p>
              </>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-4 rounded-xl font-medium transition-colors disabled:opacity-50 mt-8"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              Submit Prompt for Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
