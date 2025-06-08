'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Flame, AlertCircle } from 'lucide-react';
import { User } from '@/types';
import Image from 'next/image';
import { gsap } from 'gsap';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

// Predefined users
const VALID_USERS = {
  'admin': 'password',
  'user': '123456'
};

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      const logos = marqueeRef.current.children;
      
      gsap.set(logos, { 
        x: (i) => i * 200,
        y: 0 
      });

      gsap.to(logos, {
        x: '-=200',
        duration: 20,
        repeat: -1,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    if (VALID_USERS[username as keyof typeof VALID_USERS] === password) {
      onLogin({ username });
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          ref={marqueeRef}
          className="absolute top-1/2 left-0 w-full h-20 flex items-center overflow-hidden"
          style={{ transform: 'translateY(-50%)' }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="absolute flex-shrink-0" style={{ top: '50%', transform: 'translateY(-50%)' }}>
              <Image
                src="/images/Mad Unicorn-logo.png"
                alt="Mad Unicorn Logo"
                width={150}
                height={60}
                className="h-12 w-auto opacity-70"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-yellow-500/20 p-8">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <Image
                  src="/images/Mad Unicorn-logo.png"
                  alt="Mad Unicorn Logo"
                  width={200}
                  height={80}
                  className="h-16 w-auto mx-auto"
                  priority
                />
              </div>
              <p className="text-gray-400 text-sm">Quote Voting Platform</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter your mad username"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-400 hover:to-orange-400 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Entering...' : 'Enter The Madness'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm mb-2">
                "ตอนนี้ คุณได้เป็นหัวแถวแล้ว!"
              </p>
              <div className="text-xs text-gray-600">
                <p>Demo accounts:</p>
                <p>admin : password</p>
                <p>user : 123456</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}