import Image from 'next/image';
import Link from 'next/link';
import { Star, Lock, Image as ImageIcon, FileText, Code, Briefcase, Layout, Copy, User, Eye, Sparkles, Trash2 } from 'lucide-react';

interface PromptCardProps {
  id: string;
  title: string;
  description?: string;
  category?: string;
  aiTool?: string;
  difficulty?: string;
  visibility?: string;
  thumbnail?: string;
  copyCount?: number;
  creatorName?: string;
  creatorPhoto?: string;
  onDelete?: (id: string) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category?.toLowerCase()) {
    case 'design':
    case 'graphics & image':
      return <ImageIcon className="w-3.5 h-3.5" />;
    case 'writing':
    case 'copywriting':
      return <FileText className="w-3.5 h-3.5" />;
    case 'development':
    case 'coding':
      return <Code className="w-3.5 h-3.5" />;
    case 'business':
    case 'marketing':
      return <Briefcase className="w-3.5 h-3.5" />;
    default:
      return <Layout className="w-3.5 h-3.5" />;
  }
};

const ToolBackground = ({ tool, category }: { tool: string, category: string }) => {
  // Use beautiful high-quality Unsplash photos mapped to categories
  const getCategoryPhoto = () => {
    switch (category?.toLowerCase()) {
      case 'coding':
      case 'development':
        return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
      case 'writing':
        return 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop';
      case 'idea generation':
      case 'business':
        return 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop';
      case 'marketing':
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
      case 'graphics & image':
      case 'design':
        return 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop';
      case 'system assistant':
        return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop';
      case 'other':
        return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
      default:
        return null;
    }
  };

  const photoUrl = getCategoryPhoto();

  if (photoUrl) {
    return (
      <div className="w-full h-full relative">
        <Image src={photoUrl} alt={category} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
      </div>
    );
  }

  // Fallbacks if no category matched
  return (
    <div className="w-full h-full bg-gradient-to-r from-[#7c3aed] to-[#f472b6] flex items-center justify-center">
      <Sparkles className="w-12 h-12 text-white/50" />
    </div>
  );
};

const getToolTagColors = (tool: string) => {
  switch (tool?.toLowerCase()) {
    case 'claude':
      return 'text-[#fbbf24] border-[#fbbf24]/30 bg-[#fbbf24]/10'; // Gold
    case 'chatgpt':
      return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'; // Green
    case 'midjourney':
    default:
      return 'text-[#34d399] border-[#059669]/50 bg-[#064e3b]/30'; // Tealish green
  }
};

export default function PromptCard({ 
  id,
  title,
  description = 'No description provided.',
  category = 'General',
  aiTool = 'ChatGPT',
  difficulty = 'Beginner',
  visibility = 'Public',
  thumbnail,
  copyCount = 0,
  creatorName = 'Anonymous',
  creatorPhoto,
  onDelete
}: PromptCardProps) {
  return (
    <div className="bg-[#0f111a] border border-white/5 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col h-full group">
      <div className="h-44 relative overflow-hidden p-2">
        <div className="w-full h-full rounded-lg overflow-hidden relative">
          {thumbnail ? (
            <Image src={thumbnail} alt={title} fill className="object-cover animate-slow-zoom group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full animate-slow-zoom group-hover:scale-110 transition-transform duration-500">
              <ToolBackground tool={aiTool} category={category} />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${getToolTagColors(aiTool)}`}>
            {aiTool}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300 border border-white/10 bg-white/5 px-2.5 py-1 rounded-full">
            {difficulty}
          </span>
          {visibility === 'Private' && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 rounded-full flex items-center gap-1 ml-auto">
              <Lock className="w-3 h-3" /> PREMIUM
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-3 text-white line-clamp-2 leading-tight">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0ea5e9] uppercase tracking-wide mb-4">
            <CategoryIcon category={category} />
            {category}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-5">
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-3.5 h-3.5" />
              <span className="text-xs font-medium truncate max-w-[120px]">{creatorName}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                <Copy className="w-3.5 h-3.5" /> {copyCount}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 0.0
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href={`/prompt/${id}`} className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl transition-colors shadow-lg shadow-purple-500/20">
              <Eye className="w-4 h-4" /> View Details
            </Link>
            {onDelete && (
              <button 
                onClick={(e) => { e.preventDefault(); onDelete(id); }} 
                className="p-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl transition-colors shrink-0"
                title="Remove saved prompt"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
