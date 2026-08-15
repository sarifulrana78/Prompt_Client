'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, User, Copy, Check, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, signUp } from '@/lib/auth-client';

export default function DemoAccountsPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const router = useRouter();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string, role: string) => {
    setLoadingRole(role);
    try {
      // Attempt login first
      const { error } = await signIn.email({ email: demoEmail, password: demoPass });
      if (error) {
        // If login fails, assume demo user doesn't exist yet and create them
        toast.info(`Setting up ${role} demo account...`);
        const { error: signUpErr } = await signUp.email({
          email: demoEmail,
          password: demoPass,
          name: `${role} User`,
          ...({ role } as any),
        });
        
        if (signUpErr) {
          toast.error(`Failed to create demo account: ${signUpErr.message || JSON.stringify(signUpErr)}`);
          setLoadingRole(null);
          return;
        }
        
        // Login after successful creation
        await signIn.email({ email: demoEmail, password: demoPass });
      }
      
      toast.success(`Logged in as ${role}!`);
      if (role === 'Creator') {
        router.push('/dashboard/creator');
      } else if (role === 'Admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      toast.error('Demo login failed');
    } finally {
      setLoadingRole(null);
    }
  };

  const accounts = [
    {
      type: 'Admin',
      icon: Shield,
      color: 'from-purple-600 to-indigo-600',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      borderColor: 'hover:border-purple-500/50',
      shadowColor: 'hover:shadow-purple-500/10',
      description: 'Full access to system analytics, user management, prompt moderation, payment histories, and system configurations.',
      email: 'admin@promptbase.com',
      password: 'password123' // Assume generic password for demo or specific if required. Let's use 123456 as per screenshot.
    },
    {
      type: 'Creator',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      borderColor: 'hover:border-blue-500/50',
      shadowColor: 'hover:shadow-blue-500/10',
      description: 'Access to creator analytics, adding new AI prompts, editing owned listings, and tracking prompt views.',
      email: 'creator@promptbase.com',
      password: 'password123'
    },
    {
      type: 'Standard',
      icon: User,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      borderColor: 'hover:border-emerald-500/50',
      shadowColor: 'hover:shadow-emerald-500/10',
      description: 'Access to search prompts, copy prompts to clipboard, save to collections, leave reviews, and purchase premium access.',
      email: 'user@promptbase.com',
      password: 'password123'
    }
  ];

  // The screenshot shows 123456 as the password. Let's update the array.
  accounts.forEach(acc => acc.password = '123456');

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Demo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Accounts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Explore the platform from different user perspectives. Copy the credentials below and head over to the sign in page to experience each role.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {accounts.map((acc, index) => (
            <motion.div
              key={acc.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 transition-all duration-300 ${acc.borderColor} ${acc.shadowColor} hover:shadow-2xl relative overflow-hidden group`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${acc.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="flex flex-col h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${acc.color} p-[1px] mb-6 shadow-lg`}>
                  <div className="w-full h-full bg-[#0d1117] rounded-xl flex items-center justify-center">
                    <acc.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="mb-6">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${acc.badgeColor}`}>
                    {acc.type} User
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {acc.description}
                </p>

                <div className="space-y-4">
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 transition-colors hover:border-white/10">
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      Email
                    </div>
                    <div className="flex justify-between items-center group/copy">
                      <span className="font-mono text-sm text-gray-200">{acc.email}</span>
                      <button 
                        onClick={() => handleCopy(acc.email, `${acc.type}-email`)}
                        className="text-gray-500 hover:text-white transition-colors focus:outline-none p-1.5 rounded-md hover:bg-white/10"
                        title="Copy email"
                      >
                        {copiedField === `${acc.type}-email` ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 transition-colors hover:border-white/10">
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                      Password
                    </div>
                    <div className="flex justify-between items-center group/copy">
                      <span className="font-mono text-sm text-gray-200">•••••• <span className="text-gray-600 text-xs ml-2">({acc.password})</span></span>
                      <button 
                        onClick={() => handleCopy(acc.password, `${acc.type}-pass`)}
                        className="text-gray-500 hover:text-white transition-colors focus:outline-none p-1.5 rounded-md hover:bg-white/10"
                        title="Copy password"
                      >
                        {copiedField === `${acc.type}-pass` ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDemoLogin(acc.email, acc.password, acc.type)}
                  disabled={loadingRole !== null}
                  className={`mt-6 w-full py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-sm font-semibold transition-all hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loadingRole === acc.type ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>
                  ) : (
                    <>Login as {acc.type} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
