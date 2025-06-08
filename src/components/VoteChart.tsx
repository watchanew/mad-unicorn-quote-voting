'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Quote, ChartType } from '@/types';
import { CHART_COLORS } from '@/utils/mockData';

interface VoteChartProps {
  quotes: Quote[];
  chartType: ChartType;
}

export default function VoteChart({ quotes, chartType }: VoteChartProps) {

  const getChartData = () => {
    const topQuotes = [...quotes]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5)
      .map(quote => ({
        name: quote.text.length > 30 ? quote.text.substring(0, 30) + '...' : quote.text,
        votes: quote.votes,
      }));
    
    return topQuotes;
  };

  const data = getChartData();

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      {chartType === 'bar' ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" tick={false} />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Bar dataKey="votes" fill="#FFD600" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.slice(0, 5)}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="votes"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              onClick={() => {}}
            >
              {data.slice(0, 5).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff',
              }}
              labelStyle={{ color: '#ffffff' }}
              itemStyle={{ color: '#ffffff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">Top {chartType === 'pie' ? '5' : '5'} Quotes by Votes</p>
      </div>
    </div>
  );
}