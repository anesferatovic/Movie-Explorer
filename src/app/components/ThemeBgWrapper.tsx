'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useThemeStore } from '../../lib/store/themeStore';

export default function ThemeBgWrapper({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full transition-colors duration-300 pointer-events-none select-none z-0 ${
          theme === 'dark' ? 'bg-gray-950' : 'bg-white'
        }`}
        style={{ minHeight: '100vh', minWidth: '100vw' }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </>
  );
}
