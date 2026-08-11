'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
        <div className="flex items-center gap-3">
          <Lock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
        </div>

        <p className="text-gray-400 leading-relaxed">
          At PromptBase, your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
        </p>

        <div className="space-y-6 text-gray-300">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We collect basic account information (name, email address, profile picture) during registration or Google OAuth sign-in, along with platform usage metrics like saved prompts and reviews.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Data</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your information is used solely to operate the marketplace, authenticate your sessions, manage prompt access permissions, process payment subscriptions, and enhance platform experience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">3. Third-Party Services</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We rely on trusted third-party providers including Stripe for payment processing and Google for social authentication. We do not sell your personal data to advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">4. Cookies & Security</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We use secure, encrypted session cookies for authentication. You can control cookie settings through your browser preferences.
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
