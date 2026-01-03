/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState, useMemo, useEffect } from 'react';
import { BADGES, TROUBLESHOOTING_TIPS } from './constants';
import { BadgeCard } from './components/BadgeCard';
import { BadgeDetail } from './components/BadgeDetail';
import { AIAssistant } from './components/AIAssistant';
import { ProfileChecker } from './components/ProfileChecker';
import { BadgeStatus, Badge } from './types';
import { Github, Info, AlertTriangle, Moon, Sun, Search, UserCheck, Filter, ArrowUpDown, Tag, Layers, Sparkles } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'checker' | 'assistant' | 'troubleshooting'>('achievements');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
    return false;
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'owned' | 'unowned'>('all');
  const [sortType, setSortType] = useState<'name' | 'difficulty' | 'category' | 'rarity'>('name');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Selection & Navigation State
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);

  // Collection State (Persisted)
  const [ownedBadges, setOwnedBadges] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('my_badges');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(BADGES.map(b => b.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  // Persist Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Persist Collection
  useEffect(() => {
    localStorage.setItem('my_badges', JSON.stringify(Array.from(ownedBadges)));
  }, [ownedBadges]);

  const toggleBadgeOwned = (id: string) => {
    setOwnedBadges(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter Logic
  const filteredBadges = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    let result = BADGES.filter(b => {
      const matchesSearch = 
        b.name.toLowerCase().includes(query) || 
        b.description.toLowerCase().includes(query) ||
        b.howToEarn.toLowerCase().includes(query) ||
        (b.guideSteps && b.guideSteps.some(step => step.toLowerCase().includes(query)));

      return matchesSearch;
    });

    if (filterType === 'owned') result = result.filter(b => ownedBadges.has(b.id));
    else if (filterType === 'unowned') result = result.filter(b => !ownedBadges.has(b.id));

    if (selectedCategory !== 'All') result = result.filter(b => b.category === selectedCategory);

    if (sortType === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === 'difficulty') {
      const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Extreme': 4, 'Exclusive': 5 };
      result.sort((a, b) => (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0));
    } else if (sortType === 'category') result.sort((a, b) => a.category.localeCompare(b.category));
    else if (sortType === 'rarity') {
       const rarityOrder = { 'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Legendary': 4, 'Mythic': 5 };
       result.sort((a, b) => (rarityOrder[a.rarity] || 0) - (rarityOrder[b.rarity] || 0));
    }

    return result;
  }, [searchQuery, filterType, sortType, selectedCategory, ownedBadges]);

  const activeBadges = filteredBadges.filter(b => b.status === BadgeStatus.ACTIVE);
  const retiredBadges = filteredBadges.filter(b => b.status !== BadgeStatus.ACTIVE);
  const selectedBadge = selectedBadgeId ? BADGES.find(b => b.id === selectedBadgeId) : null;

  return (
    <div className="min-h-screen pb-20 selection:bg-github-accent/30">
      
      {/* Floating Glass Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 glass-panel border border-white/20 dark:border-white/10 rounded-2xl shadow-xl shadow-gray-200/20 dark:shadow-black/20 px-4 py-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setActiveTab('achievements'); setSelectedBadgeId(null); }}>
            <div className="bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-200 text-white dark:text-black p-2 rounded-xl group-hover:scale-105 transition-transform">
               <Github className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                Badge Hunter
              </h1>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">GitHub Edition</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
             {[
               { id: 'achievements', label: 'Gallery', icon: Sparkles },
               { id: 'checker', label: 'Checker', icon: UserCheck },
               { id: 'assistant', label: 'Assistant', icon: Search },
               { id: 'troubleshooting', label: 'Help', icon: AlertTriangle },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => { setActiveTab(tab.id as any); setSelectedBadgeId(null); }}
                 className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                   activeTab === tab.id 
                     ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm scale-105' 
                     : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                 }`}
               >
                 <tab.icon className="w-3.5 h-3.5" />
                 {tab.label}
               </button>
             ))}
          </div>

          <div className="flex items-center gap-3">
             {/* Search Input (Compact) */}
             <div className="hidden sm:flex relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-github-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab !== 'achievements') setActiveTab('achievements');
                    if (selectedBadgeId) setSelectedBadgeId(null);
                  }}
                  className="w-32 focus:w-48 bg-gray-50/50 dark:bg-gray-800/50 border border-transparent focus:border-github-accent/30 focus:bg-white dark:focus:bg-black rounded-xl py-1.5 pl-9 pr-3 text-sm transition-all outline-none"
                />
             </div>

             <button 
               onClick={() => setIsDarkMode(!isDarkMode)}
               className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
             >
               {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-32 animate-in fade-in duration-700 slide-in-from-bottom-4">
        
        {/* VIEW: DETAIL PAGE */}
        {selectedBadge && (
          <BadgeDetail 
            badge={selectedBadge} 
            onBack={() => setSelectedBadgeId(null)}
            isOwned={ownedBadges.has(selectedBadge.id)}
            onToggleOwned={() => toggleBadgeOwned(selectedBadge.id)}
          />
        )}

        {/* VIEW: GALLERY */}
        {!selectedBadge && activeTab === 'achievements' && (
          <div className="space-y-8">
            
            {/* Control Bar */}
            <div className="glass-panel rounded-2xl p-2 border border-white/20 dark:border-white/5 shadow-sm flex flex-col md:flex-row gap-2 items-center justify-between sticky top-24 z-30 backdrop-blur-md">
               <div className="flex items-center gap-2 px-4">
                  <span className="font-semibold text-gray-900 dark:text-white">Collection</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {ownedBadges.size}/{BADGES.length}
                  </span>
               </div>

               <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto p-1 scrollbar-hide">
                  {/* Category Filter */}
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-none text-sm rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-github-accent cursor-pointer"
                  >
                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>

                  {/* Sort */}
                  <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
                  
                  {[
                    { type: 'name', label: 'Name' },
                    { type: 'difficulty', label: 'Difficulty' },
                    { type: 'rarity', label: 'Rarity' }
                  ].map((s) => (
                    <button
                      key={s.type}
                      onClick={() => setSortType(s.type as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        sortType === s.type 
                          ? 'bg-github-accent text-white shadow-md shadow-blue-500/20' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* Active Badges Grid */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Achievements</h3>
                 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBadges.map(badge => (
                  <BadgeCard 
                    key={badge.id} 
                    badge={badge} 
                    isOwned={ownedBadges.has(badge.id)}
                    onToggleOwned={(e) => {
                      e.stopPropagation();
                      toggleBadgeOwned(badge.id);
                    }}
                    onClick={() => setSelectedBadgeId(badge.id)}
                  />
                ))}
                {activeBadges.length === 0 && (
                  <div className="col-span-full py-20 text-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-gray-400">No active badges found.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Retired Section */}
            {(retiredBadges.length > 0) && (
              <section className="opacity-80 hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-3 mb-6 mt-12">
                   <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                   <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Legacy & Retired</h3>
                   <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {retiredBadges.map(badge => (
                    <BadgeCard 
                      key={badge.id} 
                      badge={badge} 
                      isOwned={ownedBadges.has(badge.id)}
                      onToggleOwned={(e) => {
                         e.stopPropagation();
                         toggleBadgeOwned(badge.id);
                      }}
                      onClick={() => setSelectedBadgeId(badge.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Other Tabs with Glass Containers */}
        {!selectedBadge && activeTab === 'checker' && (
          <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border border-white/20 dark:border-white/5 shadow-2xl">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">Progress Checker</h2>
                <p className="text-gray-600 dark:text-gray-300">Track your journey towards the next tier.</p>
             </div>
             <ProfileChecker />
          </div>
        )}

        {!selectedBadge && activeTab === 'troubleshooting' && (
          <div className="max-w-3xl mx-auto space-y-4">
             {TROUBLESHOOTING_TIPS.map((tip, idx) => (
               <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {!selectedBadge && activeTab === 'assistant' && (
          <div className="max-w-3xl mx-auto">
             <AIAssistant />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;