'use client';

import { useState, useEffect } from 'react';
import { Flag, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

type AdminReport = {
  _id: string;
  reason?: string;
  description?: string;
  status?: string;
  prompt?: { title?: string };
  user?: { name?: string; email?: string };
  createdAt?: string;
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetch(`${API_BASE}/reports`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setReports(data.reports || []);
        } else {
          toast.error(data.message || 'Failed to load reports');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching reports');
      } finally {
        setLoading(false);
      }
    };

    void loadReports();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Report marked ${status}`);
        setReports(reports.map((report) => report._id === id ? { ...report, status } : report));
      } else {
        toast.error(data.message || 'Failed to update report');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating report');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Flag className="w-8 h-8 text-red-400" />
        Reported Prompts
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-card border border-border p-8 rounded-2xl text-center text-gray-400">
          No reports available.
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="bg-card border border-border rounded-3xl p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-400">
                    <span className="bg-red-500/10 text-red-300 px-2.5 py-1 rounded-full">{report.status}</span>
                    <span>Reason: <strong className="text-white">{report.reason}</strong></span>
                    <span>Prompt: <strong className="text-white">{report.prompt?.title || 'Unknown'}</strong></span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{report.description || 'No additional description provided.'}</p>
                  <p className="text-xs text-gray-500">Reported by {report.user?.name || report.user?.email || 'Unknown'} on {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(report._id, 'resolved')}
                    className="rounded-full bg-green-500/15 text-green-400 border border-green-500/20 px-4 py-2 text-sm hover:bg-green-500/20 transition-colors"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => updateStatus(report._id, 'dismissed')}
                    className="rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 px-4 py-2 text-sm hover:bg-yellow-500/20 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
