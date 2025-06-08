import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mad Unicorn Quote Voting',
  description: 'Vote for your favorite Mad Unicorn quotes - ตอนนี้ คุณได้เป็นหัวแถวแล้ว!',
  keywords: ['mad unicorn', 'startup quotes', 'voting', 'thailand startup'],
  authors: [{ name: 'watchout' }],
  openGraph: {
    title: 'Mad Unicorn Quote Voting',
    description: 'Vote for your favorite Mad Unicorn startup quotes',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}