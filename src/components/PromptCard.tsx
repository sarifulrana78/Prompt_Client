import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface PromptCardProps {
  id: string;
  title: string;
  category?: string;
  aiTool?: string;
  copyCount?: number;
  creatorName?: string;
  creatorPhoto?: string;
}

export default function PromptCard({ 
  id,
  title,
  category = 'General',
  aiTool = 'ChatGPT',
  copyCount = 0,
  creatorName = 'Anonymous',
  creatorPhoto 
}: PromptCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden card-hover flex flex-col h-full">
      <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs px-2 py-1 rounded text-white font-medium">
          {aiTool}
        </div>
        <div className="absolute top-3 right-3 bg-primary/20 text-primary text-xs px-2 py-1 rounded font-medium border border-primary/20">
          {category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2">{title}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">4.9</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full bg-gray-700 overflow-hidden">
                {creatorPhoto ? (
                  <Image src={creatorPhoto} alt={creatorName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-primary">
                    {creatorName.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400 truncate max-w-[100px]">{creatorName}</span>
            </div>
            <span className="text-xs font-medium bg-white/5 px-2 py-1 rounded text-gray-300">
              {copyCount} copies
            </span>
          </div>
          
          <Link href={`/prompt/${id}`} className="block w-full py-2 text-center text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
