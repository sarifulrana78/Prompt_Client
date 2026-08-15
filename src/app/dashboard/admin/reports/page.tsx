'use client';

import { useState, useEffect } from 'react';
import { Loader2, Eye, CheckCircle, AlertTriangle, Trash2, ShieldAlert, User as UserIcon, MessageSquareQuote } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Swal from 'sweetalert2';

const API_BASE = '/api';

type AdminReport = {
  _id: string;
  reason?: string;
  description?: string;
  status?: string;
  prompt?: { _id?: string; title?: string };
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

  const updateStatus = async (id: string, status: string, message: string) => {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(message);
        setReports(reports.map((report) => report._id === id ? { ...report, status } : report));
      } else {
        toast.error(data.message || 'Failed to update report');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating report');
    }
  };

  const warnCreator = async (reportId: string) => {
    const result = await Swal.fire({
      title: 'Send Official Warning?',
      text: "This will notify the creator of the PromptBase policy violation.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#eab308',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, Send Warning',
      background: '#11131e',
      color: '#fff'
    });

    if (result.isConfirmed) {
      updateStatus(reportId, 'resolved', 'Creator officially warned.');
    }
  };

  const removePrompt = async (reportId: string, promptId?: string) => {
    if (!promptId) {
      toast.error('Prompt already deleted or not found.');
      return;
    }

    const result = await Swal.fire({
      title: 'Remove Prompt Permanently?',
      text: "This removes the prompt from the PromptBase platform completely.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, Remove It',
      background: '#11131e',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        // Actually delete the prompt
        const res = await fetch(`${API_BASE}/admin/prompts/${promptId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await res.json();
        
        if (data.success) {
          toast.success('Prompt permanently deleted from PromptBase.');
          // Update report status to resolved since the prompt is gone
          updateStatus(reportId, 'resolved', 'Report closed. Prompt was removed.');
          
          // Optionally, remove the prompt title from the local UI to reflect deletion
          setReports(reports.map(r => r.prompt?._id === promptId ? { ...r, prompt: { ...r.prompt, title: '<Deleted Template>' } } : r));
        } else {
          toast.error(data.message || 'Failed to delete prompt');
        }
      } catch (err) {
        console.error('Error deleting prompt:', err);
        toast.error('An error occurred while deleting the prompt');
      }
    }
  };

  const handleDismiss = async (id: string) => {
    updateStatus(id, 'dismissed', 'Report dismissed and ignored.');
  };

  return (
    <div className="text-white max-w-[1400px]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 flex items-center gap-4">
          <ShieldAlert className="w-10 h-10 text-red-500" />
          PromptBase Moderation Hub
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
          This is the central command for protecting the platform. Review community reports, inspect suspicious templates, and take definitive action to keep our ecosystem safe and high-quality.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-red-500 mb-4" /> 
          <p className="font-medium tracking-widest uppercase text-xs">Syncing Queue...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 p-12 rounded-[2rem] text-center text-green-400/80 flex flex-col items-center justify-center">
          <CheckCircle className="w-16 h-16 mb-4 text-green-500/50" />
          <h2 className="text-2xl font-bold mb-2 text-green-400">All Clear!</h2>
          <p className="text-sm text-green-500/60 max-w-md">There are no active reports in the moderation queue. The PromptBase community is safe and sound.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {reports.map((report) => (
            <div key={report._id} className="relative group flex flex-col bg-[#11131e]/80 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl hover:border-white/10 transition-all duration-300">
              
              {/* Top Accent Line */}
              <div className={`h-1.5 w-full ${report.status === 'pending' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gray-700'}`} />

              {/* Glowing Orb Background */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="p-8 flex-1 relative z-10">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-[10px] font-extrabold tracking-[0.2em] text-red-400 uppercase mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Violation Category
                    </div>
                    <h3 className="text-2xl font-black text-white">{report.reason}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-1">Status</div>
                    <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg inline-block border ${
                      report.status === 'pending' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      report.status === 'resolved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      'bg-gray-500/10 border-gray-500/20 text-gray-400'
                    }`}>
                      {report.status}
                    </div>
                  </div>
                </div>

                {/* Prompt Name */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-6 shadow-inner">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Target Template</div>
                  <div className="font-mono text-sm text-[#8b5cf6] font-medium truncate">
                    {report.prompt?.title || '<Deleted Template>'}
                  </div>
                </div>

                {/* Report Details Quote */}
                <div className="flex gap-4 mb-8">
                  <MessageSquareQuote className="w-8 h-8 text-white/10 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Reporter's Comments</div>
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      "{report.description || 'No additional details provided by the reporter.'}"
                    </p>
                  </div>
                </div>
                
                {/* Reporter Info */}
                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 p-[1px]">
                    <div className="w-full h-full bg-[#11131e] rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-300">{report.user?.name || 'Anonymous User'}</div>
                    <div className="text-[10px] text-gray-500">{report.user?.email || 'N/A'} • {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : ''}</div>
                  </div>
                </div>
              </div>

              {/* Action Bar at the Bottom */}
              <div className="grid grid-cols-4 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                {report.prompt?._id ? (
                  <Link 
                    href={`/prompt/${report.prompt._id}`}
                    className="flex flex-col items-center justify-center py-4 px-2 hover:bg-[#8b5cf6]/10 border-r border-white/5 transition-colors group/btn"
                  >
                    <Eye className="w-5 h-5 text-gray-500 group-hover/btn:text-[#8b5cf6] mb-1.5 transition-colors" />
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover/btn:text-[#8b5cf6] transition-colors">Inspect</span>
                  </Link>
                ) : (
                  <button 
                    onClick={() => toast.error('This prompt has been deleted and is no longer available to inspect.')}
                    className="flex flex-col items-center justify-center py-4 px-2 bg-black/20 hover:bg-white/5 border-r border-white/5 opacity-50 transition-colors group/btn"
                  >
                    <Eye className="w-5 h-5 text-gray-600 group-hover/btn:text-white mb-1.5 transition-colors" />
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-600 group-hover/btn:text-white transition-colors">Inspect</span>
                  </button>
                )}
                
                <button 
                  onClick={() => handleDismiss(report._id)}
                  disabled={report.status !== 'pending'}
                  className="flex flex-col items-center justify-center py-4 px-2 hover:bg-emerald-500/10 border-r border-white/5 transition-colors group/btn disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5 text-gray-500 group-hover/btn:text-emerald-400 mb-1.5 transition-colors" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover/btn:text-emerald-400 transition-colors">Dismiss</span>
                </button>

                <button 
                  onClick={() => warnCreator(report._id)}
                  disabled={report.status !== 'pending'}
                  className="flex flex-col items-center justify-center py-4 px-2 hover:bg-yellow-500/10 border-r border-white/5 transition-colors group/btn disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <AlertTriangle className="w-5 h-5 text-gray-500 group-hover/btn:text-yellow-400 mb-1.5 transition-colors" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover/btn:text-yellow-400 transition-colors">Warn</span>
                </button>

                <button 
                  onClick={() => removePrompt(report._id, report.prompt?._id)}
                  disabled={report.status !== 'pending'}
                  className="flex flex-col items-center justify-center py-4 px-2 hover:bg-red-500/10 transition-colors group/btn disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-5 h-5 text-gray-500 group-hover/btn:text-red-400 mb-1.5 transition-colors" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover/btn:text-red-400 transition-colors">Remove</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
