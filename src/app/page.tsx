'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import QuoteCard from '@/components/QuoteCard';
import { User, Quote, SortOption } from '@/types';
import { getMockQuotes } from '@/utils/mockData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Search } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useLocalStorage<User | null>('madUnicornUser', null);
  const [quotes, setQuotes] = useLocalStorage<Quote[]>('madUnicornQuotes', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize quotes if empty
    if (quotes.length === 0) {
      const mockQuotes = getMockQuotes(5);
      setQuotes(mockQuotes);
    }
    
    setIsLoading(false);
  }, [quotes.length, setQuotes]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleVote = (id: number, delta: number) => {
    const updatedQuotes = quotes.map((quote: Quote) => 
      quote.id === id 
        ? { ...quote, votes: Math.max(0, quote.votes + delta) }
        : quote
    );
    setQuotes(updatedQuotes);
  };

  const getFilteredAndSortedQuotes = () => {
    const filtered = quotes.filter(quote =>
      quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.votes - a.votes);
      case 'recent':
        return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'alphabetical':
        return filtered.sort((a, b) => a.text.localeCompare(b.text));
      default:
        return filtered;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const filteredQuotes = getFilteredAndSortedQuotes();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header user={user} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search quotes..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuotes.map((quote) => (
            <div key={quote.id}>
              <QuoteCard quote={quote} onVote={handleVote} />
            </div>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No quotes found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}