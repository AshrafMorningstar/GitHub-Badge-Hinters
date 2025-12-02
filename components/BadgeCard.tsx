import React from 'react';
import { Badge, BadgeStatus } from '../types';
import { ChevronDown, ChevronUp, BookOpen, Lock, CheckCircle } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const [expanded, setExpanded] = React.useState(false);

  const isRetired = badge.status === BadgeStatus.RETIRED;
  const isHighlight = badge.status === BadgeStatus.HIGHLIGHT;

  return (
    <div className={`bg-white dark:bg-github-dark border border-gray-200 dark:border-github-border rounded-md shadow-sm overflow-hidden transition-all hover:shadow-md ${isRetired ? 'opacity-75' : ''}`}>
      <div 
        className="p-4 flex items-start gap-4 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-4xl select-none flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-50 dark:bg-github-darker rounded-full border border-gray-100 dark:border-github-border">
          {badge.emoji}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {badge.name}
              {isRetired && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900">Retired</span>}
              {isHighlight && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900">Highlight</span>}
            </h3>
            {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {badge.description}
          </p>
          
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
             {!isRetired && (
               <div className="flex items-center gap-1">
                 <CheckCircle className="w-3 h-3 text-github-success" />
                 <span>Earnable</span>
               </div>
             )}
             {badge.tiers && (
               <div className="flex items-center gap-1">
                 <div className="flex -space-x-1">
                    <div className="w-2 h-2 rounded-full bg-amber-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                 </div>
                 <span>Has Tiers</span>
               </div>
             )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-github-border bg-gray-50/50 dark:bg-github-darker/30">
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-2">How to Earn</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{badge.howToEarn}</p>
            </div>

            {badge.tiers && badge.tiers.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-2">Tiers</h4>
                <div className="grid gap-2">
                  {badge.tiers.map((tier) => (
                    <div key={tier.name} className="flex items-center justify-between text-sm p-2 bg-white dark:bg-github-dark rounded border border-gray-200 dark:border-github-border">
                      <span className={`font-medium ${tier.color}`}>{tier.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{tier.criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {badge.guideSteps && badge.guideSteps.length > 0 && (
              <div>
                 <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-2 flex items-center gap-2">
                   <BookOpen className="w-3 h-3" /> Step-by-Step Guide
                 </h4>
                 <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-github-dark p-3 rounded border border-gray-200 dark:border-github-border">
                   {badge.guideSteps.map((step, idx) => (
                     <li key={idx} className="leading-relaxed">{step}</li>
                   ))}
                 </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
