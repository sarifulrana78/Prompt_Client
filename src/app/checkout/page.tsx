'use client';

import { useState } from 'react';
import { Check, ShieldCheck, CreditCard, Diamond } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim()) {
      toast.error('Please enter a card number');
      return;
    }

    setLoading(true);

    try {
      // Direct simulation via backend
      const res = await fetch('/api/payments/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSimulation: true }),
        credentials: 'include',
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Payment successful! Your account has been upgraded.');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        toast.error(data.message || 'Verification failed. Contact support.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred.');
      setLoading(false);
    }
  };

  const handleSimulation = async () => {
    setSimulating(true);
    try {
      toast.info('Initiating sandbox simulation...');
      const res = await fetch('/api/payments/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSimulation: true }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Simulation successful! Your account has been upgraded.');
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error(err);
      toast.error('Simulation failed.');
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#11131e] border border-white/5 flex items-center justify-center shadow-lg">
            <Diamond className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Upgrade Your Account</h1>
          <p className="text-gray-400">Unlock premium prompt engineering templates and advanced assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Panel: Plan Details */}
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-block border border-[#06b6d4]/30 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-6 uppercase">
                Lifetime Plan
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">PromptBase Pro Access</h2>
              
              <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-8">
                <span className="text-2xl text-white font-bold">$</span>
                <span className="text-6xl font-bold text-white">5.00</span>
                <span className="text-gray-500 font-medium text-sm">/ one-time</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Unlock all locked Private/Premium prompts',
                  'Unlimited copy-to-clipboard actions',
                  'Engage with rating and feedback reviews',
                  'Priority access to future AI engine configurations',
                  'One-time payment, lifetime ownership'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full border border-[#0d9488]/50 bg-[#0f766e]/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#14b8a6]" strokeWidth={3} />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-6 border-t border-white/5">
              <ShieldCheck className="w-4 h-4" />
              Payments secured and encrypted via Stripe Gateway.
            </div>
          </div>

          {/* Right Panel: Payment Box */}
          <div className="bg-[#11131e] border border-white/5 rounded-2xl p-8 lg:p-10 flex flex-col gap-8">
            
            <form onSubmit={handleCheckout}>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
                <CreditCard className="w-5 h-5" />
                Card Information
              </div>

              {/* Custom Input looking like Stripe */}
              <div className="w-full bg-[#1a1b2e] border border-white/5 rounded-xl px-4 py-3.5 mb-6 shadow-inner flex items-center justify-between focus-within:border-[#8b5cf6]/50 transition-colors">
                <div className="flex items-center gap-3 w-1/2">
                  <CreditCard className="w-5 h-5 text-[#8b5cf6]" />
                  <input
                    type="text"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="bg-transparent text-sm tracking-widest font-mono text-white outline-none w-full placeholder-gray-500"
                    required
                  />
                </div>
                <div className="flex items-center gap-3 w-1/2 justify-end">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="bg-transparent text-sm tracking-widest font-mono text-white outline-none w-16 text-center placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="bg-transparent text-sm tracking-widest font-mono text-white outline-none w-10 text-center placeholder-gray-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading || simulating}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 shadow-[0_0_25px_rgba(139,92,246,0.4)] flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Pay One-time $5.00'
                )}
              </button>
            </form>

            <div className="mt-auto border border-dashed border-[#8b5cf6]/30 rounded-xl p-6 relative">
              <div className="text-center mb-4">
                <span className="text-[#a78bfa] text-[10px] font-bold tracking-widest uppercase">
                  Stripe Testing Assist
                </span>
              </div>
              
              <p className="text-xs text-gray-400 text-center leading-relaxed mb-6">
                No credit card configured? Or running locally without keys? Use our Sandbox simulation to instantly test upgraded views and dashboards.
              </p>

              <button 
                type="button"
                onClick={handleSimulation}
                disabled={loading || simulating}
                className="w-full py-3 rounded-xl font-bold text-black transition-all bg-[#06b6d4] hover:bg-[#0891b2] disabled:opacity-50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center text-sm"
              >
                {simulating ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  'Simulate $5 Test Checkout'
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
