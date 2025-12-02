import React, { useState } from 'react';
import { BADGES, TROUBLESHOOTING_TIPS } from './constants';
import { BadgeCard } from './components/BadgeCard';
import { AIAssistant } from './components/AIAssistant';
import { ProfileChecker } from './components/ProfileChecker';
import { BadgeStatus } from './types';
import { Github, Trophy, Info, AlertTriangle, Moon, Sun, Search, UserCheck } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'checker' | 'assistant' | 'troubleshooting'>('achievements');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle Dark Mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const activeBadges = BADGES.filter(b => b.status === BadgeStatus.ACTIVE);
  const retiredBadges = BADGES.filter(b => b.status !== BadgeStatus.ACTIVE);

  const filteredActive = activeBadges.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRetired = retiredBadges.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-github-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-github-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-github-dark text-white p-1.5 rounded-full">
               <Github className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block">
              Badge Hunter
            </h1>
          </div>

          <div className="flex items-center gap-1 md:gap-2 bg-gray-100 dark:bg-github-darker p-1 rounded-lg overflow-x-auto">
             <button 
               onClick={() => setActiveTab('achievements')}
               className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeTab === 'achievements' ? 'bg-white dark:bg-github-border shadow-sm text-github-dark dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
             >
               Achievements
             </button>
             <button 
               onClick={() => setActiveTab('checker')}
               className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'checker' ? 'bg-white dark:bg-github-border shadow-sm text-github-dark dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
             >
               <UserCheck className="w-4 h-4 hidden md:block" /> Check Progress
             </button>
             <button 
               onClick={() => setActiveTab('troubleshooting')}
               className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeTab === 'troubleshooting' ? 'bg-white dark:bg-github-border shadow-sm text-github-dark dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
             >
               Troubleshooting
             </button>
             <button 
               onClick={() => setActiveTab('assistant')}
               className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'assistant' ? 'bg-white dark:bg-github-border shadow-sm text-purple-600 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300'}`}
             >
               AI Assistant
             </button>
          </div>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-github-border text-gray-500 dark:text-gray-400 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-8">
        
        {activeTab === 'achievements' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Profile Badges</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                  GitHub Achievements celebrate your milestones and contributions. 
                  They appear on your public profile and reflect your journey as a developer.
                </p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search badges..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-github-darker border border-gray-200 dark:border-github-border rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-github-accent/50 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Active Badges Grid */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Active Achievements</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredActive.map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
                {filteredActive.length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-github-darker/50 rounded-lg border border-dashed border-gray-300 dark:border-github-border">
                    No active badges found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </section>

            {/* Retired / Highlights */}
            {filteredRetired.length > 0 && (
              <section className="pt-8 border-t border-gray-200 dark:border-github-border">
                 <div className="flex items-center gap-2 mb-4 opacity-75">
                  <Info className="w-5 h-5 text-gray-500" />
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Retired & Highlights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRetired.map(badge => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'checker' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
             <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Progress Checker</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  See how close you are to the next tier for trackable achievements.
                </p>
             </div>
             <ProfileChecker />
          </div>
        )}

        {activeTab === 'troubleshooting' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Troubleshooting</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Earned a badge but don't see it on your profile? Here are the most common reasons why.
                </p>
             </div>

             <div className="space-y-4">
               {TROUBLESHOOTING_TIPS.map((tip, idx) => (
                 <div key={idx} className="bg-white dark:bg-github-dark border border-gray-200 dark:border-github-border p-5 rounded-lg shadow-sm flex gap-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-github-attention" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{tip.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                    </div>
                 </div>
               ))}
             </div>

             <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-sm text-blue-800 dark:text-blue-300">
               <strong>Note:</strong> Some achievements are "one-time" only (like Quickdraw or YOLO). Once you earn them, you keep them forever, but you cannot "re-earn" them to change the date.
             </div>
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Badge Assistant</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Powered by Gemini. Ask specifically how to earn a badge, or get strategies for leveling up tiers.
              </p>
            </div>
            <AIAssistant />
          </div>
        )}

      </main>
      
      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 mt-20 pt-8 border-t border-gray-200 dark:border-github-border text-center text-sm text-gray-500 dark:text-gray-500">
        <p>Community maintained guide. Not affiliated with GitHub.</p>
        <p className="mt-2">Contribute to this list on GitHub.</p>
      </footer>
    </div>
  );
}

export default App;
