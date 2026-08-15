'use client';

import { useState, useEffect } from 'react';
import { Copy, Bookmark, FileText, Loader2, TrendingUp } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const API_BASE = '/api';

type CreatorAnalytics = {
  totalPrompts: number;
  totalCopies: number;
  totalBookmarks: number;
  metricsChart: Array<{ name: string; copies: number; bookmarks: number }>;
  accumulativeGrowth: Array<{ date: string; TotalPrompts: number; TotalCopies: number }>;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin text-[#8b5cf6] mr-2" /> Loading analytics...
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] text-white">
      <h1 className="text-3xl font-bold mb-2">Creator Analysis Dashboard</h1>
      <p className="text-gray-400 mb-8 text-sm">Real-time usage statistics and performance insights.</p>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Prompts */}
        <div className="bg-[#11131e] border border-white/5 p-6 rounded-xl flex items-center gap-6">
          <div className="w-14 h-14 bg-[#3b0764]/40 rounded-xl flex items-center justify-center border border-[#8b5cf6]/20">
            <FileText className="w-6 h-6 text-[#a78bfa]" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Prompts</div>
            <div className="text-3xl font-bold">{analytics?.totalPrompts || 0}</div>
          </div>
        </div>

        {/* Total Copies */}
        <div className="bg-[#11131e] border border-white/5 p-6 rounded-xl flex items-center gap-6">
          <div className="w-14 h-14 bg-[#0f766e]/30 rounded-xl flex items-center justify-center border border-[#06b6d4]/20">
            <Copy className="w-6 h-6 text-[#06b6d4]" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Copies</div>
            <div className="text-3xl font-bold">{analytics?.totalCopies || 0}</div>
          </div>
        </div>

        {/* Total Bookmarks */}
        <div className="bg-[#11131e] border border-white/5 p-6 rounded-xl flex items-center gap-6">
          <div className="w-14 h-14 bg-[#064e3b]/40 rounded-xl flex items-center justify-center border border-[#10b981]/20">
            <Bookmark className="w-6 h-6 text-[#10b981]" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Bookmarks</div>
            <div className="text-3xl font-bold">{analytics?.totalBookmarks || 0}</div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Bar Chart */}
        <div className="bg-[#11131e] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Copy className="w-5 h-5 text-gray-400" />
            Prompt Templates Copies vs Bookmarks
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.metricsChart || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff50" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff20' }}
                />
                <YAxis 
                  stroke="#ffffff50" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff20' }}
                  allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1a1b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="square" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Bar dataKey="bookmarks" name="Bookmarks" fill="#a78bfa" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="copies" name="Copies" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-[#11131e] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Accumulative Growth Metrics
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics?.accumulativeGrowth || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCopies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#ffffff50" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff20' }}
                />
                <YAxis 
                  stroke="#ffffff50" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={{ stroke: '#ffffff20' }}
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="TotalCopies" 
                  name="Total Copies" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCopies)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="TotalPrompts" 
                  name="Total Prompts" 
                  stroke="#a78bfa" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPrompts)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

