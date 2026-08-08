'use client';

import { Users, List, CreditCard, Shield, Flag } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        Admin Control Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
