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
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300`}
      >
        <MainNav />
        <ThemeBgWrapper>{children}</ThemeBgWrapper>
      </body>
    </html>
  );
}
