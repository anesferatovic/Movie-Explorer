'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react';
import { useSearchStore } from '../../lib/store/searchStore';
import { useUserStore } from '../../lib/store/userStore';
import { signInWithGoogle, signOutUser, auth } from '../../lib/firebase';

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

  useEffect(() => {
    if (searchParams.get('q')) setSearch(searchParams.get('q') || '');
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
    <nav className="flex items-center gap-2 bg-gray-100 p-4 rounded-md shadow-md mb-8">
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
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
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
            <span className="font-medium">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 ml-2"
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
