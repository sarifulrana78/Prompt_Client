'use client';

import Link from 'next/link';

export default function DashboardProfile() {
  // Mock data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    subscription: 'Free',
    totalPrompts: 2,
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="bg-card border border-border rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
              J
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-400 mb-4">{user.email}</p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 px-3 py-1 rounded-md text-sm font-medium">Role: {user.role}</span>
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                user.subscription === 'Premium' ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-500 border border-yellow-500/30' : 'bg-gray-800 text-gray-300'
              }`}>
                Plan: {user.subscription}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-md text-sm font-medium">Prompts: {user.totalPrompts}</span>
            </div>
          </div>
        </div>
      </div>

      {user.subscription === 'Free' && (
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Upgrade to Premium</h3>
            <p className="text-gray-300">Unlock unlimited private prompts, exclusive tools, and advanced analytics for just $5.</p>
          </div>
          <Link href="/checkout" className="shrink-0 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  );
}
