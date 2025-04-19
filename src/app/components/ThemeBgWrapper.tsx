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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-white'
      }`}
    >
      {children}
    </div>
  );
}
