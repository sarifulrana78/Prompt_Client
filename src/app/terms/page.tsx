'use client';

import Link from 'next/link';
import { ShieldCheck, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
        </div>

        <p className="text-gray-400 leading-relaxed">
          Welcome to PromptBase. By accessing or using our platform, services, and website, you agree to be bound by these Terms of Service.
        </p>

        <div className="space-y-6 text-gray-300">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">1. User Accounts</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">2. Prompt Sharing & Ownership</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              When publishing AI prompts on PromptBase, you certify that you have the right to share the content. Inappropriate, offensive, harmful, or copyrighted content without authorization is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">3. Premium Subscriptions & Payments</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium access unlocks private prompts and exclusive feature sets. All payments are processed securely via Stripe. One-time payments grants lifetime access according to current plan specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">4. Content Moderation</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              PromptBase moderators reserve the right to review, edit, reject, or remove any prompt or review that violates platform community guidelines.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-border flex justify-between items-center text-sm text-gray-500">
          <span>Last updated: August 2026</span>
          <Link href="/" className="text-primary hover:underline font-medium">
            Back to Home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
