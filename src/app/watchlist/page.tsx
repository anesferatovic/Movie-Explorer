'use client';

import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useFavoritesStore } from '../../lib/store/favoritesStore';
import { useUserStore } from '../../lib/store/userStore';
import { useRouter } from 'next/navigation';
import { Movie } from '@/lib/api/utils';

const MovieList = lazy(() => import('../components/MovieList'));

export default function WatchlistPage() {
  const { user } = useUserStore();
  const { userWatchlist } = useFavoritesStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/popular');
      return;
    }
    const ids = userWatchlist[user.uid] || [];
    if (ids.length === 0) {
      setMovies([]);
      return;
    }
    let cancelled = false;
    Promise.all(
      ids.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4d475a6aee0e49aa4c56ce728cb15491`
        )
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      if (!cancelled) setMovies(results.filter(Boolean));
    });
    return () => {
      cancelled = true;
    };
  }, [user, userWatchlist, router]);

  if (!user) return null;

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4 text-gray-500">WATCH LIST</h1>
      {movies.length === 0 ? (
        <p className="text-gray-500">No results.</p>
      ) : (
        <Suspense fallback={<div>Loading movies...</div>}>
          <MovieList movies={movies} />
        </Suspense>
      )}
    </main>
  );
}
