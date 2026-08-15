'use client';

import { useState, useEffect, useMemo } from 'react';
import { Users, List, CreditCard, Shield, Flag, MessageSquare, Copy, Loader2, TrendingUp, PieChart as PieChartIcon, BarChart2 } from 'lucide-react';
import Link from 'next/link';
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
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a78bfa', '#f43f5e', '#10b981'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_BASE = '/api';

type AdminAnalytics = {
  totalUsers: number;
  totalPrompts: number;
  totalReviews: number;
  totalCopies: number;
  promptGrowth?: Array<{ _id: { month: number; year: number }; count: number }>;
  copiesByCategory?: Array<{ _id: string; copies: number; count: number }>;
};

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/analytics`, { credentials: 'include' });
        const data = await res.json();
        if (data.success && data.analytics) {
          setAnalytics(data.analytics);
        }
      } catch (err) {
        console.error('Error fetching admin analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadAnalytics();
  }, []);

  const formattedPromptGrowth = useMemo(() => {
    if (!analytics?.promptGrowth) return [];
    return analytics.promptGrowth.map((item) => ({
      date: `${MONTHS[item._id.month - 1]} ${item._id.year}`,
      prompts: item.count
    }));
  }, [analytics]);

  const formattedCategoryData = useMemo(() => {
    if (!analytics?.copiesByCategory) return [];
    return analytics.copiesByCategory.map((item) => ({
      name: item._id,
      copies: item.copies,
      count: item.count
    }));
  }, [analytics]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        Admin Control Panel
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading platform analytics...
        </div>
      ) : (
        <div className="space-y-8 mb-10">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Users className="w-5 h-5 text-primary" /> Total Users
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalUsers || 0}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <List className="w-5 h-5 text-blue-400" /> Total Prompts
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalPrompts || 0}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" /> Total Reviews
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalReviews || 0}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Copy className="w-5 h-5 text-purple-400" /> Total Prompt Copies
              </div>
              <div className="text-3xl font-bold text-white">{analytics?.totalCopies || 0}</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Prompts Growth Area Chart */}
            <div className="bg-card border border-border p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-gray-400" /> Prompt Growth (Last 6 Months)
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={formattedPromptGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPromptsAdmin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={{ stroke: '#ffffff20' }} />
                    <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={{ stroke: '#ffffff20' }} allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="prompts" name="New Prompts" stroke="#a78bfa" strokeWidth={2} fillOpacity={1} fill="url(#colorPromptsAdmin)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Copies by Category Bar Chart */}
            <div className="bg-card border border-border p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <BarChart2 className="w-5 h-5 text-gray-400" /> Copies by Category
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formattedCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={{ stroke: '#ffffff20' }} />
                    <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={{ stroke: '#ffffff20' }} allowDecimals={false} />
                    <Tooltip cursor={{ fill: '#ffffff05' }} contentStyle={{ backgroundColor: '#1a1b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Bar dataKey="copies" name="Total Copies" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Prompts by Category Pie Chart */}
            <div className="bg-card border border-border p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                <PieChartIcon className="w-5 h-5 text-gray-400" /> Prompts Distribution by Category
              </h2>
              <div className="h-[300px] w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {formattedCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1b2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-white">Management Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/admin/users" className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors">
          <Users className="w-6 h-6 text-primary mb-3" />
          <h3 className="font-semibold text-lg">Manage Users</h3>
          <p className="text-sm text-gray-400">View and update user roles</p>
        </Link>

        <Link href="/dashboard/admin/prompts" className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors">
          <List className="w-6 h-6 text-blue-400 mb-3" />
          <h3 className="font-semibold text-lg">All Prompts</h3>
          <p className="text-sm text-gray-400">Review & moderate platform prompts</p>
        </Link>

        <Link href="/dashboard/admin/payments" className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors">
          <CreditCard className="w-6 h-6 text-yellow-400 mb-3" />
          <h3 className="font-semibold text-lg">Payments</h3>
          <p className="text-sm text-gray-400">Track subscriptions & Stripe logs</p>
        </Link>

        <Link href="/dashboard/admin/reports" className="bg-card border border-border p-6 rounded-2xl hover:border-primary transition-colors">
          <Flag className="w-6 h-6 text-red-400 mb-3" />
          <h3 className="font-semibold text-lg">Reported Prompts</h3>
          <p className="text-sm text-gray-400">Review prompts reported by users</p>
        </Link>
      </div>
    </div>
  );
}

