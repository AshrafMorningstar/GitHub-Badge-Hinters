import React from 'react';
import { Badge, BadgeStatus } from '../types';
import { CheckCircle2, Star, Plus, Gem, Info } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  isOwned: boolean;
  onToggleOwned: (e: React.MouseEvent) => void;
  onClick: () => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    case 'Uncommon': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    case 'Rare': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'Legendary': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800';
    case 'Mythic': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isOwned, onToggleOwned, onClick }) => {
  const isRetired = badge.status === BadgeStatus.RETIRED;

  return (
    <div 
      onClick={onClick}
      className={`group relative glass-panel border border-white/40 dark:border-white/5 rounded-2xl p-5 flex flex-col gap-4 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 ${isRetired ? 'opacity-60 grayscale-[0.8] hover:grayscale-0 hover:opacity-100' : ''}`}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-transparent dark:from-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Top Row: Icon + Actions */}
      <div className="flex items-start justify-between relative z-10">
        <div className="relative group/icon">
          <div className="text-4xl w-14 h-14 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-white/30 dark:border-white/10 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[5deg]">
            {badge.emoji}
          </div>
          {isOwned && (
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-github-darker rounded-full p-0.5 shadow-md border border-gray-100 dark:border-gray-800 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-github-success fill-green-100 dark:fill-green-900/30" />
            </div>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleOwned(e); }}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm border ${
            isOwned 
              ? 'bg-green-100/50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-900/50' 
              : 'bg-gray-100/50 text-gray-400 border-gray-200 dark:bg-gray-800/50 dark:text-gray-500 dark:border-gray-700 hover:bg-blue-100 hover:text-blue-500 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:hover:border-blue-800'
          }`}
          title={isOwned ? "Remove from collection" : "Mark as owned"}
        >
          {isOwned ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 relative z-10 flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-github-accent transition-colors duration-300">
            {badge.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {badge.description}
          </p>
        </div>
        
        <div className="mt-auto pt-2 flex items-center gap-2 flex-wrap">
           <span className={`text-[10px] px-2 py-1 rounded-md border font-medium flex items-center gap-1.5 ${getRarityColor(badge.rarity)}`}>
             <Gem className="w-3 h-3" /> {badge.rarity}
           </span>
           <span className="text-[10px] px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 font-medium opacity-80">
             {badge.difficulty}
           </span>
        </div>
      </div>

      {/* Hover Tooltip for Quick Guide */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 rounded-xl bg-gray-900/90 dark:bg-white/90 backdrop-blur-xl text-white dark:text-gray-900 text-xs shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0 border border-white/10 dark:border-gray-200">
        <div className="font-bold mb-1 pb-1 border-b border-white/10 dark:border-gray-300 flex items-center gap-1">
          <Info className="w-3 h-3" /> How to Earn
        </div>
        <p className="leading-normal opacity-90">{badge.howToEarn}</p>
      </div>
    </div>
  );
};