'use client';

import { Shield, Sparkles, User, Copy, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

type DemoAccount = {
  id: string;
  role: string;
  email: string;
  passwordText: string;
  passwordValue: string;
  description: string;
  icon: React.ReactNode;
  badgeClass: string;
  buttonClass: string;
  accentClass: string;
};

const demoAccounts: DemoAccount[] = [
  {
    id: 'admin',
    role: 'Admin',
    email: 'admin@promptbase.com',
    passwordText: '•••••• (123456)',
    passwordValue: '123456',
    description: 'Full access to system analytics, user management, prompt moderation, payment histories, and system configurations.',
    icon: <Shield className="w-5 h-5" />,
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    buttonClass: 'hover:bg-purple-500/10 hover:text-purple-400',
    accentClass: 'border-purple-500',
  },
  {
    id: 'creator',
    role: 'Creator',
    email: 'creator@promptbase.com',
    passwordText: '•••••• (123456)',
    passwordValue: '123456',
    description: 'Access to creator analytics, adding new AI prompts, editing owned listings, and tracking prompt views.',
    icon: <Sparkles className="w-5 h-5" />,
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    buttonClass: 'hover:bg-blue-500/10 hover:text-blue-400',
    accentClass: 'border-blue-500',
  },
  {
    id: 'standard',
    role: 'Standard',
    email: 'user@promptbase.com',
    passwordText: '•••••• (123456)',
    passwordValue: '123456',
    description: 'Access to search prompts, copy prompts to clipboard, save to collections, leave reviews, and purchase premium access.',
    icon: <User className="w-5 h-5" />,
    badgeClass: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    buttonClass: 'hover:bg-teal-500/10 hover:text-teal-400',
    accentClass: 'border-teal-500',
  }
];

export default function DemoLogins({ onLogin }: { onLogin: (email: string, pass: string, role: string) => void }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {demoAccounts.map((account) => (
          <div key={account.id} className={`bg-[#11131a] border-t-2 ${account.accentClass} border-x border-b border-x-white/5 border-b-white/5 rounded-2xl p-6 flex flex-col h-full shadow-lg`}>
            
            <div className="mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${account.badgeClass.split(' ')[0]} ${account.badgeClass.split(' ')[1]} ${account.badgeClass.split(' ')[2]}`}>
                {account.icon}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${account.badgeClass}`}>
                {account.role} USER
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-1">
              {account.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-center justify-between group">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    EMAIL
                  </div>
                  <div className="text-sm text-white font-mono">{account.email}</div>
                </div>
                <button onClick={() => handleCopy(account.email, `${account.id}-email`)} className="text-gray-500 hover:text-white transition-colors">
                  {copiedField === `${account.id}-email` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-center justify-between group">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                    PASSWORD
                  </div>
                  <div className="text-sm text-white font-mono">{account.passwordText}</div>
                </div>
                <button onClick={() => handleCopy(account.passwordValue, `${account.id}-pass`)} className="text-gray-500 hover:text-white transition-colors">
                  {copiedField === `${account.id}-pass` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              onClick={() => onLogin(account.email, account.passwordValue, account.role)}
              className={`w-full flex items-center justify-center gap-2 bg-[#1a1d24] text-white py-3 rounded-xl font-medium transition-colors text-sm ${account.buttonClass}`}
            >
              Login as {account.role} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
