'use client';

import React, { useState } from 'react';
import { LogOut, BarChart3, Home, Menu, X } from 'lucide-react';
import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Quotes', icon: Home },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-yellow-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/images/Mad Unicorn-logo.png"
                alt="Mad Unicorn Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </div>
            <div className="hidden md:block h-8 w-px bg-gray-700"></div>
            <p className="hidden md:block text-sm text-gray-400">Quote Voting Platform</p>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === href ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-gray-400">
              Welcome, <span className="text-mad-yellow font-semibold">{user.username}</span>
            </span>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 group-hover:text-mad-yellow transition-colors" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === href ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 px-4">
                Welcome, <span className="text-mad-yellow font-semibold">{user.username}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}