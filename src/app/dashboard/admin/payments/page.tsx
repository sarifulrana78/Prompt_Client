'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

type PaymentRecord = {
  _id: string;
  amount: number;
  transactionId: string;
  status: string;
  createdAt: string;
  user?: {
    name?: string;
    email?: string;
  };
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const res = await fetch(`${API_BASE}/payments/admin`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setPayments(data.payments || []);
        } else {
          toast.error(data.message || 'Failed to fetch payments');
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
        toast.error('Error fetching payment history');
      } finally {
        setLoading(false);
      }
    };

    void loadPayments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <CreditCard className="w-8 h-8 text-primary" />
        Payments & Subscriptions
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading payments...
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-card border border-border p-8 rounded-2xl text-center text-gray-400">
          No payment records found yet.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-border text-xs text-gray-400 uppercase tracking-wider">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {payments.map((pmt) => (
                  <tr key={pmt._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{pmt.user?.name || 'Anonymous User'}</td>
                    <td className="p-4 text-gray-400">{pmt.user?.email || 'N/A'}</td>
                    <td className="p-4 text-primary font-bold">${pmt.amount?.toFixed(2)}</td>
                    <td className="p-4 text-xs font-mono text-gray-400 truncate max-w-[180px]">{pmt.transactionId}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                        {pmt.status || 'Completed'}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-400">
                      {new Date(pmt.createdAt).toLocaleDateString()} {new Date(pmt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

