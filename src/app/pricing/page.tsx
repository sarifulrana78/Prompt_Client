'use client';

import Link from 'next/link';
import { Check, Shield, Zap } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-[80vh] pt-24 pb-16 bg-background text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" /> Premium Plan
          </span>
          <h1 className="text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-gray-400 text-lg">
            Upgrade to Premium for unlimited access to private prompts, advanced features, and priority support.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-card border border-border rounded-3xl p-10 shadow-xl">
            <div className="mb-8">
              <span className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Free</span>
              <h2 className="text-4xl font-bold mt-4">$0</h2>
              <p className="text-gray-400 mt-3">Access public prompts and basic features to get started.</p>
            </div>
            <ul className="space-y-4 text-gray-300 mb-8">
              {[
                'Browse public prompts',
                'Create up to 3 prompts',
                'Basic copy functionality',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm text-gray-500">Perfect for trying the platform.</div>
          </div>

          <div className="bg-card border border-primary/20 rounded-3xl p-10 shadow-xl ring-1 ring-primary/10">
            <div className="mb-8">
              <span className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Premium</span>
              <h2 className="text-4xl font-bold mt-4">$5</h2>
              <p className="text-gray-400 mt-3">One-time payment for lifetime access to every premium feature.</p>
            </div>
            <ul className="space-y-4 text-gray-300 mb-8">
              {[
                'Unlock private premium prompts',
                'Copy prompts directly without restrictions',
                'Advanced analytics and dashboard insights',
                'Priority support',
                'No hidden subscription fees',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/checkout" className="inline-flex items-center justify-center w-full bg-primary hover:bg-primary-hover text-black font-semibold px-6 py-4 rounded-2xl transition-colors">
              Upgrade Now
            </Link>
            <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Secure checkout powered by Stripe.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
