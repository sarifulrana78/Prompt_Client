'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill out all fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" /> Support
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Have questions about PromptBase, premium access, or prompt submission? Send us a message!
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl font-bold text-white">Thank You!</h2>
            <p className="text-gray-400 text-sm">Your message has been received. Our team will respond shortly.</p>
            <Link href="/" className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-full text-sm transition-colors mt-4">
              Return Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-black/30 border border-border rounded-xl p-3 text-white text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full bg-black/30 border border-border rounded-xl p-3 text-white text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-black/30 border border-border rounded-xl p-3 text-white text-sm focus:outline-none focus:border-primary resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-black py-3.5 rounded-xl font-bold transition-colors text-sm"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
