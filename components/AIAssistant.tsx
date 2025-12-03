import React, { useState, useRef, useEffect } from 'react';
import { generateBadgeAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, User, Send, Zap, BrainCircuit, Loader2 } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I can help you earn GitHub badges. Ask me how to get "Pull Shark" or tips for "Galaxy Brain"!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await generateBadgeAdvice(userMsg.text, useThinking);
      const botMsg: ChatMessage = { 
        role: 'model', 
        text: responseText,
        isThinking: useThinking
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-github-dark border border-gray-200 dark:border-github-border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-github-border flex items-center justify-between bg-gray-50 dark:bg-github-darker">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-github-accent" />
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Badge Assistant</h2>
        </div>
        
        {/* Thinking Toggle */}
        <button 
          onClick={() => setUseThinking(!useThinking)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
            useThinking 
              ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' 
              : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
          }`}
          title={useThinking ? "Using Deep Reasoning Model" : "Using Fast Model"}
        >
          {useThinking ? <BrainCircuit className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
          {useThinking ? 'Deep Think' : 'Fast Mode'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.isThinking ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'}`}>
                {msg.isThinking ? <BrainCircuit className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-github-accent text-white rounded-br-none' 
                : 'bg-gray-100 dark:bg-github-border/50 text-gray-800 dark:text-gray-200 rounded-bl-none'
            }`}>
              {msg.text}
            </div>

            {msg.role === 'user' && (
               <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400">
                 <User className="w-4 h-4" />
               </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
             </div>
             <div className="bg-gray-50 dark:bg-github-darker text-gray-500 text-xs py-2 px-3 rounded-full flex items-center gap-2">
               {useThinking ? 'Thinking deeply...' : 'Typing...'}
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-github-border bg-white dark:bg-github-dark">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={useThinking ? "Ask a complex question about strategies..." : "Ask a quick question..."}
            className="w-full bg-gray-100 dark:bg-github-darker border border-gray-200 dark:border-github-border text-gray-900 dark:text-gray-100 rounded-full py-2.5 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-github-accent/50 focus:border-transparent transition-all"
            disabled={loading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-1.5 p-1.5 bg-github-accent text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-2 text-center">
          Assistant may make mistakes. Check official docs for critical info.
        </p>
      </div>
    </div>
  );
};