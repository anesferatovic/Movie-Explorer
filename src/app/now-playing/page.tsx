'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Pagination from '../components/Pagination';
import { useNowPlayingMovies } from '../../lib/hooks/useNowPlayingMovies';
import { useSearchStore } from '../../lib/store/searchStore';

const MovieList = lazy(() => import('../components/MovieList'));

export default function NowPlayingPage() {
  const { lastPageNowPlaying, setLastPageNowPlaying } = useSearchStore();
  const [page, setPage] = useState(lastPageNowPlaying);
  const { movies, error, totalPages } = useNowPlayingMovies(page);

  useEffect(() => {
    setLastPageNowPlaying(page);
  }, [page, setLastPageNowPlaying]);

  return (
    <main className="flex-1 flex flex-col min-h-0 h-full">
      <div className="flex-1 flex flex-col h-full">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Suspense
            fallback={<div className="text-gray-500">Loading movies...</div>}
          >
            <MovieList movies={movies} />
          </Suspense>
        )}
        <div className="mt-auto flex justify-center pt-8 pb-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
