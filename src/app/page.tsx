'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Sparkles, Zap, Shield, Star, Users } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span>The #1 Marketplace for AI Prompts</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Unlock the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Generative AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Discover, share, and monetize high-quality prompts for ChatGPT, Midjourney, Claude, and more. Boost your productivity today.
            </p>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-32 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all glass"
                placeholder="Search for 'marketing copy' or 'logo design'..."
              />
              <button className="absolute inset-y-2 right-2 px-6 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition-colors">
                Search
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Trending:</span>
              {['Midjourney V6', 'SEO Articles', 'Web Development', 'Logo Design'].map((tag) => (
                <Link key={tag} href={`/prompts?search=${tag}`} className="text-sm text-gray-300 hover:text-primary transition-colors px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Prompts</h2>
              <p className="text-gray-400">Discover the most popular prompts this week.</p>
            </div>
            <Link href="/prompts" className="text-primary hover:text-primary-hover transition-colors font-medium">
              View All &rarr;
            </Link>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div key={i} variants={itemVariants} className="bg-card border border-border rounded-xl overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs px-2 py-1 rounded text-white font-medium">
                    ChatGPT
                  </div>
                  <div className="absolute top-3 right-3 bg-primary/20 text-primary text-xs px-2 py-1 rounded font-medium border border-primary/20">
                    Marketing
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-white">Ultimate SEO Blog Post Generator</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-xs text-gray-400">(128 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                      <span className="text-xs text-gray-400">Alex J.</span>
                    </div>
                    <span className="text-xs font-medium bg-white/5 px-2 py-1 rounded text-gray-300">
                      1.2k copies
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why PromptBase?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The easiest way to level up your AI skills and workflow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant Productivity", desc: "Save hours of trial and error. Copy proven prompts and get perfect results instantly." },
              { icon: Shield, title: "Verified Quality", desc: "Every prompt is tested and reviewed by our community to ensure it delivers as promised." },
              { icon: Users, title: "Top Creators", desc: "Learn from the best prompt engineers in the world and join a thriving community." }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 glass">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories (Extra Section 1) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Marketing', 'Coding', 'Writing', 'Design', 'Business', 'Education', 'Productivity'].map((cat) => (
              <Link key={cat} href={`/prompts?category=${cat}`} className="px-6 py-4 rounded-xl bg-card border border-border hover:border-primary transition-colors text-center w-32 sm:w-40">
                <div className="font-medium">{cat}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (Extra Section 2) */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Supercharge Your AI?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of users discovering the best AI prompts on the internet.</p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition-colors text-lg">
              Get Started for Free
            </Link>
            <Link href="/prompts" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full font-medium transition-colors text-lg">
              Explore Prompts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
