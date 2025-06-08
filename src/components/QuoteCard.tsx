'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Quote } from '@/types';
import Image from 'next/image';

interface QuoteCardProps {
  quote: Quote;
  onVote: (id: number, delta: number) => void;
}

export default function QuoteCard({ quote, onVote }: QuoteCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="w-full aspect-[16/10] rounded-lg mb-4 relative overflow-hidden">
            <Image
              src={quote.imageUrl}
              alt="Quote scene"
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <p className="text-lg mb-3">{quote.text}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>by {quote.author}</span>
            <span>•</span>
            <span>{new Date(quote.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <button
            onClick={() => onVote(quote.id, 1)}
            className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors group"
            aria-label="Upvote"
          >
            <Plus className="w-6 h-6 group-hover:text-mad-yellow" />
          </button>
          <span className="text-xl font-bold my-1 text-mad-yellow">{quote.votes}</span>
          <button
            onClick={() => onVote(quote.id, -1)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
            aria-label="Downvote"
          >
            <Minus className="w-6 h-6 group-hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}