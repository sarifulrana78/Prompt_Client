'use client';

import { CreditCard } from 'lucide-react';

export default function AdminPaymentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <CreditCard className="w-8 h-8 text-primary" />
        Payments & Subscriptions
      </h1>
      <div className="bg-card border border-border p-8 rounded-2xl text-center text-gray-400">
        Track Stripe subscription logs and payment statuses.
      </div>
    </div>
  );
}
