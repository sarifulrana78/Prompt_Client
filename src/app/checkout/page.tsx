'use client';

import { useState } from 'react';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || 'Unable to start checkout');
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error('Payment checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-8 items-center bg-card border border-border rounded-3xl p-8 lg:p-12 glass">
        
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-2">
            <Zap className="w-4 h-4" />
            <span>Premium Plan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Upgrade Your Workflow</h1>
          <p className="text-lg text-gray-400 max-w-md">
            Get unlimited access to the most powerful AI prompts on the internet. One-time payment, lifetime value.
          </p>
          
          <ul className="space-y-4 pt-4">
            {[
              'Access all Premium/Private prompts',
              'Copy prompts directly to clipboard',
              'Advanced AI testing tools inside platform',
              'Priority support & feature requests',
              'Zero hidden fees or subscriptions'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-sm bg-background border border-border rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h3 className="text-xl font-semibold mb-2 text-center">Lifetime Access</h3>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-5xl font-bold">$5</span>
            <span className="text-gray-400">one-time</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">$5.00</span>
            </div>
            <div className="flex justify-between text-sm border-b border-border pb-4">
              <span className="text-gray-400">Taxes</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary">$5.00</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Checkout with Stripe'
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4" />
            Secure payment powered by Stripe
          </div>
        </div>

      </div>
    </div>
  );
}
