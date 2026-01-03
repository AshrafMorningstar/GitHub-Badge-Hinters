/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, CheckCircle2, User as UserIcon } from 'lucide-react';
import { fetchUserStats } from '../services/githubService';
import { BADGES } from '../constants';
import { UserStats, Badge } from '../types';

export const ProfileChecker: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setStats(null);

    try {
      const data = await fetchUserStats(username);
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  // Only show badges that have a metric key we can track
  const trackableBadges = BADGES.filter(b => b.metricKey && ['merged_prs', 'stars'].includes(b.metricKey));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-github-dark border border-gray-200 dark:border-github-border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" /> Check Real Progress
        </h2>
        <form onSubmit={handleCheck} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
               <span className="text-sm">@</span>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github_username"
              className="w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-github-darker border border-gray-300 dark:border-github-border rounded-md focus:ring-2 focus:ring-github-accent/50 focus:border-transparent outline-none dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-github-success text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>

      {stats && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4 bg-white dark:bg-github-dark border border-gray-200 dark:border-github-border p-4 rounded-lg">
            <img src={stats.avatarUrl} alt={stats.username} className="w-16 h-16 rounded-full border border-gray-200 dark:border-github-border" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stats.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">@{stats.username}</p>
            </div>
          </div>

          <div className="grid gap-4">
            {trackableBadges.map(badge => {
              const currentVal = stats.metrics[badge.metricKey!] || 0;
              // Find current tier
              let currentTier = null;
              let nextTier = badge.tiers![0];

              for (let i = 0; i < badge.tiers!.length; i++) {
                if (currentVal >= badge.tiers![i].threshold!) {
                  currentTier = badge.tiers![i];
                  nextTier = badge.tiers![i + 1] || null;
                } else {
                  nextTier = badge.tiers![i];
                  break;
                }
              }

              // Calculate progress percentage to next tier
              let progress = 0;
              let target = nextTier ? nextTier.threshold! : (currentTier ? currentTier.threshold! : 100);
              let prevTarget = currentTier ? (badge.tiers!.indexOf(currentTier) > 0 ? badge.tiers![badge.tiers!.indexOf(currentTier)-1].threshold! : 0) : 0;
              
              if (nextTier) {
                 // Percentage between previous tier and next tier
                 // Simple calculation: (current - prev) / (next - prev)
                 const range = nextTier.threshold! - prevTarget;
                 const progressInRange = currentVal - prevTarget;
                 progress = Math.min(100, Math.max(0, (progressInRange / range) * 100));
              } else {
                 progress = 100; // Maxed out
              }
              
              const isMaxed = !nextTier;

              return (
                <div key={badge.id} className="bg-white dark:bg-github-dark border border-gray-200 dark:border-github-border rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl bg-gray-50 dark:bg-github-darker p-2 rounded-lg border border-gray-100 dark:border-github-border">
                        {badge.emoji}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">{badge.name}</h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Current: <span className="font-mono font-medium text-gray-900 dark:text-gray-200">{currentVal}</span>
                        </div>
                      </div>
                    </div>
                    {currentTier && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${currentTier.color.replace('text-', 'text-').replace('text-', 'bg-').replace('700', '100').replace('400', '100').replace('slate', 'gray')} border-opacity-20`}>
                        {currentTier.name}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs font-semibold inline-block text-github-accent uppercase">
                        {isMaxed ? 'Max Level Achieved!' : `Next: ${nextTier?.name}`}
                      </div>
                      <div className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                        {isMaxed ? '' : `${currentVal} / ${target}`}
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100 dark:bg-github-darker border border-gray-200 dark:border-github-border">
                      <div style={{ width: `${progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isMaxed ? 'bg-github-success' : 'bg-github-accent'} transition-all duration-1000 ease-out`}></div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    * Stats estimated via public API. May be delayed.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
