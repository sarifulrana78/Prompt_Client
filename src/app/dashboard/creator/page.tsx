'use client';

import { useState, useEffect } from 'react';
import { BarChart, Copy, Bookmark, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

type CreatorAnalytics = {
  totalPrompts: number;
  totalCopies: number;
  totalBookmarks: number;
  totalReviews: number;
  copiesChart: Array<{ name: string; copies: number }>;
};

export default function CreatorAnalyticsPage() {
  const [analytics, setAnalytics] = useState<CreatorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/creator-analytics`, { credentials: 'include' });
        const data = await res.json();
        if (data.success && data.analytics) {
          setAnalytics(data.analytics);
        } else {
          toast.error(data.message || 'Failed to load creator analytics');
        }
      } catch (err) {
        console.error('Error fetching creator analytics:', err);
        toast.error('Error fetching creator analytics');
      } finally {
        setLoading(false);
      }
    };

    void loadAnalytics();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <BarChart className="w-8 h-8 text-primary" />
        Creator Analytics
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading analytics...
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Sparkles className="w-5 h-5 text-primary" /> Created Prompts
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalPrompts || 0}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Copy className="w-5 h-5 text-blue-400" /> Total Copies
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalCopies || 0}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Bookmark className="w-5 h-5 text-yellow-400" /> Total Bookmarks
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalBookmarks || 0}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <MessageSquare className="w-5 h-5 text-purple-400" /> Total Reviews
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalReviews || 0}</div>
            </div>
          </div>

          {/* Top Prompts Performance */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Top Performing Prompts</h2>
            {analytics?.copiesChart && analytics.copiesChart.length > 0 ? (
              <div className="space-y-4">
                {analytics.copiesChart.map((item, index) => {
                  const maxCopies = Math.max(...analytics.copiesChart.map((c) => c.copies), 1);
                  const percentage = Math.round((item.copies / maxCopies) * 100);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-300 truncate max-w-xs">{item.name}</span>
                        <span className="text-primary font-semibold">{item.copies} copies</span>
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm py-4">No copy statistics available yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

