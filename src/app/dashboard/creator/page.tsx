'use client';

import { BarChart, TrendingUp, Copy, Eye } from 'lucide-react';

export default function CreatorAnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <BarChart className="w-8 h-8 text-primary" />
        Creator Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <Copy className="w-5 h-5 text-primary" /> Total Copies
          </div>
          <div className="text-3xl font-bold text-white">1,245</div>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <Eye className="w-5 h-5 text-blue-400" /> Total Views
          </div>
          <div className="text-3xl font-bold text-white">8,920</div>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" /> Avg Rating
          </div>
          <div className="text-3xl font-bold text-white">4.9 ★</div>
        </div>
      </div>
    </div>
  );
}
