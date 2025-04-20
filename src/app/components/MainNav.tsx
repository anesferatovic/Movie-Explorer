'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react';
import { useSearchStore } from '../../lib/store/searchStore';
import { useUserStore } from '../../lib/store/userStore';
import { signInWithGoogle, signOutUser, auth } from '../../lib/firebase';
import { useThemeStore } from '../../lib/store/themeStore';

interface User {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

const navLinks = [
  { href: '/popular', label: 'Popular' },
  { href: '/top-rated', label: 'Top Rated' },
  { href: '/upcoming', label: 'Upcoming' },
  { href: '/now-playing', label: 'Now Playing' },
];

export default function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search, setSearch } = useSearchStore();
  const { user, setUser, clearUser } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (searchParams && searchParams.get('q'))
      setSearch(searchParams.get('q') || '');
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          email: firebaseUser.email,
        } as User);
      } else {
        clearUser();
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const firebaseUser = await signInWithGoogle();
      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        email: firebaseUser.email,
      } as User);
    } catch (e) {
      alert('Sign in failed');
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    clearUser();
  };

  return (
    <nav
      className={`sticky top-0 z-30 flex items-center gap-2 p-4 rounded-md shadow-md mb-8 transition-colors
        ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-md font-medium ${
            pathname === link.href
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
          }`}
        >
          {link.label}
        </Link>
      ))}
      <form onSubmit={handleSearch} className="ml-auto flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Search
        </button>
      </form>
      <button
        onClick={toggleTheme}
        className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        title={
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        }
      >
        {theme === 'light' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill="currentColor"
              d="M21 12.79A9 9 0 0111.21 3a7 7 0 108.58 9.79z"
            />
          </svg>
        )}
      </button>
      {user && (
        <>
          <Link
            href="/favorites"
            className={`px-4 py-2 rounded-md font-medium bg-yellow-500 text-white hover:bg-yellow-600`}
          >
            FAVORITES
          </Link>
          <Link
            href="/watchlist"
            className={`px-4 py-2 rounded-md font-medium bg-green-500 text-white hover:bg-green-600`}
          >
            WATCH LIST
          </Link>
        </>
      )}
      <div className="ml-4 flex items-center gap-2">
        {user ? (
          <>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || user.email || 'User'}
                className="w-8 h-8 rounded-full border"
              />
            )}
            <span className="font-medium text-gray-500">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 ml-2 cursor-pointer"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}
