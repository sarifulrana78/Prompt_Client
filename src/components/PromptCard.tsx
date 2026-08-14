import Image from 'next/image';
import Link from 'next/link';
import { Star, Lock, Image as ImageIcon, FileText, Code, Briefcase, Layout, Copy } from 'lucide-react';

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
  creatorPhoto 
}: PromptCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden card-hover flex flex-col h-full">
      <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 relative">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <ImageIcon className="w-12 h-12 opacity-50" />
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 border border-teal-400/30 bg-teal-400/10 px-2 py-0.5 rounded-full">
            {aiTool}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 border border-gray-400/30 bg-gray-400/10 px-2 py-0.5 rounded-full">
            {difficulty}
          </span>
          {visibility === 'Private' && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 border border-rose-400/30 bg-rose-400/10 px-2 py-0.5 rounded-full flex items-center gap-1 ml-auto">
              <Lock className="w-3 h-3" /> PREMIUM
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 text-white line-clamp-2 leading-tight">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-500 uppercase tracking-wide mb-4">
            <CategoryIcon category={category} />
            {category}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 rounded-full bg-gray-700 overflow-hidden">
                {creatorPhoto ? (
                  <Image src={creatorPhoto} alt={creatorName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white bg-primary">
                    {creatorName.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 truncate max-w-[100px]">{creatorName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" /> {copyCount}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9
              </span>
            </div>
          </div>
          
          <Link href={`/prompt/${id}`} className="block w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg transition-colors shadow-lg shadow-purple-500/20">
            <span aria-hidden="true">👁️</span> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
