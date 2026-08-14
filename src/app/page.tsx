'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Zap, Shield, Users, Star, Copy, TrendingUp, Award, Target } from 'lucide-react';
import PromptCard from '@/components/PromptCard';

const API_BASE = '/api';

type FeaturedPrompt = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  aiTool?: string;
  difficulty?: string;
  visibility?: string;
  thumbnail?: string;
  copyCount?: number;
  creator?: { name?: string; photoURL?: string; image?: string };
};

type TopCreator = {
  _id: string;
  name?: string;
  photoURL?: string;
  totalPrompts: number;
  totalCopies: number;
};

const staticReviews = [
  { id: 1, name: 'Sarah Johnson', role: 'Marketing Manager', rating: 5, comment: 'PromptBase has completely transformed how I use AI tools. The quality of prompts here is unmatched!', avatar: 'S' },
  { id: 2, name: 'Alex Chen', role: 'Software Developer', rating: 5, comment: 'I save hours every week using prompts from this platform. The search and filter system is incredibly powerful.', avatar: 'A' },
  { id: 3, name: 'Maria Garcia', role: 'Content Creator', rating: 5, comment: 'Found some amazing Midjourney prompts that take my art to the next level. Highly recommend to all creators!', avatar: 'M' },
  { id: 4, name: 'David Kim', role: 'Entrepreneur', rating: 5, comment: 'The premium prompts are worth every penny. My productivity with AI tools has increased by 3x since joining.', avatar: 'D' },
  { id: 5, name: 'Emily Watson', role: 'UX Designer', rating: 5, comment: 'Top-notch prompt library. The community is active and always sharing new, creative ways to use AI.', avatar: 'E' },
  { id: 6, name: 'James Miller', role: 'Data Analyst', rating: 5, comment: 'The analytics prompts alone are worth the subscription. I use them daily for my work reports.', avatar: 'J' },
];

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredPrompts, setFeaturedPrompts] = useState<FeaturedPrompt[]>([]);
  const [topCreators, setTopCreators] = useState<TopCreator[]>([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetch(`${API_BASE}/prompts/featured`);
        const data = await res.json();
        if (data.success && data.prompts?.length > 0) {
          setFeaturedPrompts(data.prompts);
        }
      } catch (err) {
        console.error('Failed to fetch featured prompts:', err);
      }
    };

    const loadTopCreators = async () => {
      try {
        const res = await fetch(`${API_BASE}/prompts/top-creators`);
        const data = await res.json();
        if (data.success && data.creators?.length > 0) {
          setTopCreators(data.creators);
        }
      } catch (err) {
        console.error('Failed to fetch top creators:', err);
      }
    };

    void loadFeatured();
    void loadTopCreators();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/prompts?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const trendingTags = ['ChatGPT', 'SEO', 'Marketing', 'Development', 'Midjourney', 'Claude'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>The #1 Marketplace for AI Prompts</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Unlock the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Generative AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Discover, share, and monetize high-quality prompts for ChatGPT, Midjourney, Claude, and more. Boost your productivity today.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-32 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all glass"
                placeholder="Search for 'marketing copy' or 'logo design'..."
              />
              <button type="submit" className="absolute inset-y-2 right-2 px-6 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition-colors">
                Search
              </button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <span className="text-sm text-gray-500 mr-2">Trending:</span>
              {trendingTags.map((tag) => (
                <Link key={tag} href={`/prompts?search=${tag}`} className="text-sm text-gray-300 hover:text-primary transition-colors px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-primary/30">
                  {tag}
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/prompts" className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                Explore All Prompts <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/register" className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-medium transition-colors flex items-center justify-center">
                Become a Creator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { label: 'AI Prompts', value: '10,000+', icon: Sparkles },
              { label: 'Happy Users', value: '50,000+', icon: Users },
              { label: 'Total Copies', value: '500K+', icon: Copy },
              { label: 'Top Creators', value: '1,200+', icon: Award },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
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
          
          {featuredPrompts.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredPrompts.map((prompt) => (
                <motion.div key={prompt._id} variants={itemVariants}>
                  <PromptCard
                    id={prompt._id}
                    title={prompt.title}
                    description={prompt.description}
                    category={prompt.category}
                    aiTool={prompt.aiTool}
                    difficulty={prompt.difficulty}
                    visibility={prompt.visibility}
                    thumbnail={prompt.thumbnail}
                    copyCount={prompt.copyCount || 0}
                    creatorName={prompt.creator?.name || 'Anonymous'}
                    creatorPhoto={prompt.creator?.photoURL || prompt.creator?.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No featured prompts yet.</p>
              <Link href="/prompts" className="text-primary hover:underline">Explore all prompts &rarr;</Link>
            </div>
          )}
        </div>
      </section>

      {/* Engine Compatibility Section */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-sm font-bold tracking-widest text-[#7c3aed] uppercase mb-3">Multi-Platform</h4>
            <h2 className="text-4xl font-bold text-white mb-4">Engine Compatibility</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Prompts on PromptBase are tailored for individual models to exploit distinct strengths.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                tool: 'ChatGPT',
                model: 'GPT-4o / GPT-4',
                desc: 'Complex reasoning, detailed programming architectures, logic refinement.',
                color: 'text-[#10b981]'
              },
              {
                tool: 'Gemini',
                model: 'Gemini 1.5 Pro',
                desc: 'Ultra-long context windows, deep code analysis, Google Workspace syncing.',
                color: 'text-[#0ea5e9]'
              },
              {
                tool: 'Claude',
                model: 'Claude 3.5 Sonnet',
                desc: 'Premium programmatic output, highly natural copywriting, markdown structuring.',
                color: 'text-[#f97316]'
              },
              {
                tool: 'Midjourney',
                model: 'Midjourney v6',
                desc: 'Highly artistic rendering, aspect-ratio configuration, photo-realism parameters.',
                color: 'text-[#a855f7]'
              }
            ].map((engine, i) => (
              <motion.div 
                key={engine.tool} 
                variants={itemVariants} 
                className="p-6 rounded-2xl bg-[#0f111a] border border-white/5 hover:border-white/10 transition-colors card-hover flex flex-col h-full"
              >
                <h3 className={`font-bold text-lg mb-4 ${engine.color}`}>{engine.tool}</h3>
                <h4 className="text-white font-semibold text-sm mb-3">{engine.model}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{engine.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose PromptBase?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The easiest way to level up your AI skills and workflow.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, title: "Instant Productivity", desc: "Save hours of trial and error. Copy proven prompts and get perfect results instantly.", color: "text-yellow-400" },
              { icon: Shield, title: "Verified Quality", desc: "Every prompt is reviewed by our community to ensure it delivers as promised.", color: "text-primary" },
              { icon: Users, title: "Top Creators", desc: "Learn from the best prompt engineers in the world and join a thriving community.", color: "text-blue-400" },
              { icon: TrendingUp, title: "Track Performance", desc: "Monitor how many times your prompts are copied, rated, and bookmarked.", color: "text-pink-400" },
              { icon: Target, title: "Precision Results", desc: "Find exactly what you need with advanced filters by AI tool, category and difficulty.", color: "text-orange-400" },
              { icon: Award, title: "Creator Rewards", desc: "Earn recognition by sharing your best prompts and building your creator profile.", color: "text-purple-400" },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 glass hover:border-primary/30 transition-colors">
                <div className={`w-12 h-12 rounded-full bg-white/10 ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Creators Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-sm font-bold tracking-widest text-[#7c3aed] uppercase mb-3">Showcase</h4>
            <h2 className="text-4xl font-bold text-white mb-4">Top Prompt Creators</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Engage with community leaders pioneering advanced prompt structures.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {(topCreators.length > 0 ? topCreators : Array(3).fill(null)).map((creator, i) => (
              <motion.div 
                key={creator?._id || i}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-[#0f111a] border border-white/5 hover:border-purple-500/30 transition-all card-hover"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-b from-purple-500 to-transparent">
                      <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
                        {creator?.photoURL ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={creator.photoURL} alt={creator.name || 'Creator'} className="w-full h-full object-cover" />
                        ) : (
                          <span>{creator?.name?.charAt(0) || ['P', 'C', 'G'][i]}</span>
                        )}
                      </div>
                    </div>
                    {/* Badge Icon */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-purple-600 border-2 border-[#0f111a] flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-white mb-1">
                    {creator?.name || ['PromptMaster', 'CreativeAI', 'GeminiWiz'][i]}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {(creator as { role?: string })?.role || ['Senior Engineer', 'Art Director', 'Writer & Marketer'][i]}
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/5 mb-6"></div>
                  
                  <div className="flex w-full justify-around text-center">
                    <div>
                      <div className="text-xl font-bold text-white mb-1">
                        {creator?.totalPrompts || (i * 7 + 28)}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Prompts</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white mb-1">
                        {creator?.totalCopies || (i * 130 + 850)}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Copies</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-black/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Thousands of creators, developers, and marketers trust PromptBase daily.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {staticReviews.map((review) => (
              <motion.div 
                key={review.id}
                variants={itemVariants}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-colors relative"
              >
                <div className="absolute top-4 right-4 text-4xl text-white/5 font-serif">&ldquo;</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{review.name}</div>
                    <div className="text-xs text-gray-400">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { name: 'Marketing', emoji: '📢' },
              { name: 'Development', emoji: '💻' },
              { name: 'Writing', emoji: '✍️' },
              { name: 'Design', emoji: '🎨' },
              { name: 'Business', emoji: '💼' },
            ].map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link href={`/prompts?category=${cat.name}`} className="flex flex-col items-center px-6 py-4 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-center w-32 sm:w-40 group">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                  <div className="font-medium text-sm">{cat.name}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16,185,129,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)' }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Supercharge Your AI?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of users discovering the best AI prompts on the internet.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/register" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition-colors text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                Get Started for Free
              </Link>
              <Link href="/prompts" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full font-medium transition-colors text-lg">
                Explore Prompts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
