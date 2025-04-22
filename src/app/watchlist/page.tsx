'use client';

import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useFavoritesStore } from '../../lib/store/favoritesStore';
import { useUserStore } from '../../lib/store/userStore';
import { useRouter } from 'next/navigation';
import { Movie } from '@/lib/api/utils';
import Pagination from '../components/Pagination';

const MovieList = lazy(() => import('../components/MovieList'));

const MOVIES_PER_PAGE = 20;

export default function WatchlistPage() {
  const { user } = useUserStore();
  const { userWatchlist } = useFavoritesStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const [page, setPage] = useState(1);

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

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE) || 1;
  const paginatedMovies = movies.slice(
    (page - 1) * MOVIES_PER_PAGE,
    page * MOVIES_PER_PAGE
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <main className="flex flex-col min-h-screen pb-8">
      <h1 className="text-gray-500 text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2 sm:px-4 md:px-8">
        WATCH LIST
      </h1>
      <div className="flex-1 flex flex-col max-w-full w-full mx-auto px-2 sm:px-4 md:px-8">
        {movies.length === 0 ? (
          <p className="text-gray-500 px-2 sm:px-4 md:px-8">No results.</p>
        ) : (
          <Suspense
            fallback={<div className="text-gray-500">Loading movies...</div>}
          >
            <MovieList movies={paginatedMovies} />
          </Suspense>
        )}
        {movies.length > 10 && (
          <div className="mt-auto flex justify-center pb-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </main>
  );
}
