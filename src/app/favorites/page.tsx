'use client';

import React, { useEffect, useState } from 'react';
import { useFavoritesStore } from '../../lib/store/favoritesStore';
import { useUserStore } from '../../lib/store/userStore';
import { useRouter } from 'next/navigation';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { Movie } from '@/lib/api/utils';

const MOVIES_PER_PAGE = 20;

export default function FavoritesPage() {
  const { user } = useUserStore();
  const { userFavorites } = useFavoritesStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) {
      router.replace('/popular');
      return;
    }
    const ids = userFavorites[user.uid] || [];
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
  }, [user, userFavorites, router]);

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
    <main className="flex flex-col min-h-screen">
      <h1 className="text-gray-500 text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2 sm:px-4 md:px-8">
        FAVORITE MOVIES
      </h1>
      <div className="flex flex-col flex-1 max-w-full w-full mx-auto px-2 sm:px-4 md:px-8">
        <div className="flex-1 flex flex-col">
          {movies.length === 0 ? (
            <p className="text-gray-500 px-2 sm:px-4 md:px-8">No results.</p>
          ) : (
            <MovieList movies={paginatedMovies} />
          )}
        </div>
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
