import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MainNav from './components/MainNav';
import { ReactNode } from 'react';
import ThemeBgWrapper from './components/ThemeBgWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie Explorer',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white dark:bg-gray-950 transition-colors duration-300`}
      >
        <div className="flex flex-col h-full min-h-screen gap-6">
          <MainNav />
          <ThemeBgWrapper>
            <div className="flex-1 flex flex-col h-full">{children}</div>
          </ThemeBgWrapper>
        </div>
      </body>
    </html>
  );
}
