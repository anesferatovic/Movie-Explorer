'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Pagination from '../components/Pagination';
import { useTopRatedMovies } from '../../lib/hooks/useTopRatedMovies';
import { useSearchStore } from '../../lib/store/searchStore';

const MovieList = lazy(() => import('../components/MovieList'));

export default function TopRatedPage() {
  const { lastPageTopRated, setLastPageTopRated } = useSearchStore();
  const [page, setPage] = useState(lastPageTopRated);
  const { movies, error, totalPages } = useTopRatedMovies(page);

  useEffect(() => {
    setLastPageTopRated(page);
  }, [page, setLastPageTopRated]);

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
        <div className="mt-auto flex justify-center pb-8">
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
