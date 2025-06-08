'use client';

import React from 'react';
import { Flame, TrendingUp, Zap } from 'lucide-react';
import { Quote } from '@/types';

interface StatsCardsProps {
  quotes: Quote[];
}

export default function StatsCards({ quotes }: StatsCardsProps) {
  const totalVotes = quotes.reduce((sum, quote) => sum + quote.votes, 0);
  const topVotes = quotes.length > 0 ? Math.max(...quotes.map(q => q.votes)) : 0;

  const stats = [
    {
      label: 'Total Quotes',
      value: quotes.length,
      icon: Flame,
      color: 'text-mad-yellow',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Total Votes',
      value: totalVotes.toLocaleString(),
      icon: TrendingUp,
      color: 'text-mad-orange',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Top Quote Votes',
      value: topVotes.toLocaleString(),
      icon: Zap,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-3 ${stat.bgColor} rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}