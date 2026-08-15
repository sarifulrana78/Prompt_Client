'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { Mail, FileText, CheckCircle, Diamond } from 'lucide-react';

const API_BASE = '/api';

type ProfileData = {
  user?: {
    name?: string;
    email?: string;
    photoURL?: string;
    role?: string;
    subscription?: string;
  };
  totalPrompts?: number;
};

export default function DashboardProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/profile`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    void loadProfile();
  }, []);

  const user = {
    name: session?.user?.name || profile?.user?.name || 'User',
    email: session?.user?.email || profile?.user?.email || 'user@promptbase.com',
    image: session?.user?.image || profile?.user?.photoURL,
    role: (session?.user as { role?: string } | undefined)?.role || profile?.user?.role || 'User',
    subscription: (session?.user as { subscription?: string } | undefined)?.subscription || profile?.user?.subscription || 'Free',
    totalPrompts: profile?.totalPrompts || 0,
  };

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">User Account Profile</h1>
        <p className="text-gray-400">Manage your plan, credentials, and published prompt details.</p>
      </div>
      
      {/* Profile Card */}
      <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px] z-10">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-3xl font-bold text-white overflow-hidden bg-[#11131e]">
                {user.image ? (
                  <Image src={user.image} alt={user.name} fill className="object-cover" />
                ) : (
                  initial
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
            <div className="flex items-center text-gray-400 mb-4 gap-2 text-sm">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#2a1b41] text-[#a78bfa] px-3 py-1 rounded-md text-xs font-bold tracking-wider">
                ROLE: {user.role.toUpperCase()}
              </span>
              <span className="bg-[#1f1a14] text-[#fbbf24] border border-[#423114] px-3 py-1 rounded-md text-xs font-bold tracking-wider">
                PLAN: {user.subscription.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#11131e] border border-white/5 rounded-2xl p-6">
          <FileText className="w-5 h-5 text-[#8b5cf6] mb-4" />
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-2">PROMPTS PUBLISHED</h3>
          <p className="text-3xl font-bold text-white">{user.totalPrompts}</p>
        </div>
        
        <div className="bg-[#11131e] border border-white/5 rounded-2xl p-6">
          <CheckCircle className="w-5 h-5 text-[#0ea5e9] mb-4" />
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-2">ACCOUNT STATUS</h3>
          <p className="text-lg font-bold text-[#10b981]">Verified Member</p>
        </div>
      </div>

      {/* Upgrade Banner */}
      {user.subscription === 'Free' && (
        <div className="bg-gradient-to-r from-[#11131e] to-[#1e1b4b] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <Diamond className="w-5 h-5 text-white" />
              <h3 className="text-xl font-bold text-white">Upgrade to Pro Lifetime</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unlock access to all private prompt templates, parameter sets, and community reviews for a single one-time contribution of $5.
            </p>
          </div>
          
          <Link href="/checkout" className="relative z-10 shrink-0 bg-[#06b6d4] hover:bg-[#0891b2] text-black px-6 py-3 rounded-xl font-semibold transition-colors">
            Upgrade Now ($5)
          </Link>
        </div>
      )}
      {user.subscription === 'Premium' && (
        <div className="bg-[#11131e] border border-white/5 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#10b981]" />
          <span className="text-[#10b981] font-medium text-sm">
            Lifetime Premium Active - Enjoy complete access to all Prompt Marketplace items!
          </span>
        </div>
      )}
    </div>
  );
}
