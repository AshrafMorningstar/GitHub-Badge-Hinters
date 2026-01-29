import React from 'react';
import { Badge, BadgeStatus } from '../types';
import { ArrowLeft, CheckCircle2, Lock, BookOpen, Star, ShieldCheck, Tag, Gem } from 'lucide-react';

interface BadgeDetailProps {
  badge: Badge;
  onBack: () => void;
  isOwned: boolean;
  onToggleOwned: () => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    case 'Uncommon': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300';
    case 'Rare': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
    case 'Legendary': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300';
    case 'Mythic': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const BadgeDetail: React.FC<BadgeDetailProps> = ({ badge, onBack, isOwned, onToggleOwned }) => {
  const isRetired = badge.status === BadgeStatus.RETIRED;

  return (
    <div className="animate-in slide-in-from-right-8 duration-500 ease-out">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-github-accent transition-colors group"
      >
        <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-all">
           <ArrowLeft className="w-4 h-4" /> 
        </div>
        Back to Gallery
      </button>

      <div className="glass-panel border border-white/20 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header Hero */}
        <div className="relative p-10 bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 dark:to-transparent border-b border-gray-100 dark:border-gray-800">
           <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <div className="text-[200px] leading-none grayscale opacity-50">{badge.emoji}</div>
           </div>

           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700 flex items-center justify-center text-8xl animate-float">
                {badge.emoji}
              </div>

              <div className="flex-1 space-y-4">
                 <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${getRarityColor(badge.rarity)}`}>
                       <Gem className="w-3 h-3" /> {badge.rarity}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                       {badge.difficulty}
                    </span>
                    {isRetired && <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Retired</span>}
                 </div>

                 <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 tracking-tight">
                    {badge.name}
                 </h1>
                 
                 <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                    {badge.description}
                 </p>

                 <div className="pt-4">
                    <button
                      onClick={onToggleOwned}
                      className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                        isOwned 
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100'
                      }`}
                    >
                      {isOwned ? <CheckCircle2 className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                      {isOwned ? 'Collected' : 'Add to Collection'}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
           {/* Strategy */}
           <div className="md:col-span-2 p-8 md:p-10 space-y-8 bg-white/50 dark:bg-gray-900/30">
              <div className="flex items-center gap-2 mb-6">
                 <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">How to Earn</h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 font-medium">
                    {badge.howToEarn}
                 </p>
                 
                 {badge.guideSteps && (
                   <div className="space-y-4">
                      {badge.guideSteps.map((step, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-github-accent text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/30">
                              {i + 1}
                           </div>
                           <p className="text-gray-600 dark:text-gray-300 pt-1">{step}</p>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
           </div>

           {/* Stats */}
           <div className="p-8 md:p-10 bg-gray-50/50 dark:bg-black/20">
              <div className="flex items-center gap-2 mb-6">
                 <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tier Breakdown</h2>
              </div>

              {badge.tiers ? (
                <div className="space-y-4 relative">
                  {/* Connector Line */}
                  <div className="absolute top-4 bottom-4 left-[19px] w-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                  
                  {badge.tiers.map((tier, i) => (
                    <div key={tier.name} className="flex gap-4 items-start group">
                       <div className={`w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10 transition-transform group-hover:scale-110 shadow-sm`}>
                          <div className={`w-3 h-3 rounded-full ${tier.color.replace('text-', 'bg-')}`}></div>
                       </div>
                       <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-all">
                          <div className="flex justify-between items-center mb-1">
                             <span className={`font-bold ${tier.color}`}>{tier.name}</span>
                             {tier.threshold && <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">{tier.threshold}+</span>}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{tier.criteria}</p>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center text-gray-400 text-sm">
                   Single Tier Achievement
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                 <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Details</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                       <div className="text-xs text-gray-400 mb-1">Category</div>
                       <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{badge.category}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                       <div className="text-xs text-gray-400 mb-1">Metric Key</div>
                       <div className="font-mono font-medium text-sm text-gray-800 dark:text-gray-200 truncate" title={badge.metricKey}>{badge.metricKey || '-'}</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};