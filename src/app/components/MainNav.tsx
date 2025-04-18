'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect } from 'react';
import { useSearchStore } from '../../lib/store/searchStore';

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

  useEffect(() => {
    if (searchParams.get('q')) setSearch(searchParams.get('q') || '');
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
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
    </nav>
  );
}
