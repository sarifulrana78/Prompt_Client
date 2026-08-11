'use client';

import { useState, useEffect } from 'react';
import { Users, List, CreditCard, Shield, Flag, MessageSquare, Copy, Loader2 } from 'lucide-react';
import Link from 'next/link';

const API_BASE = '/api';

type AdminAnalytics = {
  totalUsers: number;
  totalPrompts: number;
  totalReviews: number;
  totalCopies: number;
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

