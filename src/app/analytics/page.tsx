'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import VoteChart from '@/components/VoteChart';
import { User, Quote, ChartType } from '@/types';
import { getMockQuotes } from '@/utils/mockData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { BarChart3, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<User | null>('madUnicornUser', null);
  const [quotes, setQuotes] = useLocalStorage<Quote[]>('madUnicornQuotes', []);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      if (!user) {
        router.push('/');
        return;
      }

      // Initialize quotes if empty (fallback)
      if (quotes.length === 0) {
        const mockQuotes = getMockQuotes(5);
        setQuotes(mockQuotes);
      }

      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [user, router, isMounted, quotes.length, setQuotes]);

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-mad-yellow">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-mad-yellow">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header user={user} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-mad-yellow mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Insights into Mad Unicorn quote performance</p>
        </div>

        {/* Stats Cards */}
        <StatsCards quotes={quotes} />

        {/* Chart Controls */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-yellow-500">Vote Distribution</h2>
            <div className="flex bg-gray-900 rounded-lg border border-gray-700">
              <button
                onClick={() => setChartType('bar')}
                className={`p-3 rounded-l-lg transition-colors ${
                  chartType === 'bar' ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-800'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`p-3 rounded-r-lg transition-colors ${
                  chartType === 'pie' ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-800'
                }`}
              >
                <PieChart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="max-w-4xl mx-auto">
          <VoteChart quotes={quotes} chartType={chartType} />
        </div>
      </main>
    </div>
  );
}
