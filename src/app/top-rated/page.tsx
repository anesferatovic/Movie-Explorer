'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Pagination from '../components/Pagination';
import { useTopRatedMovies } from '../../lib/hooks/useTopRatedMovies';

const MovieList = lazy(() => import('../components/MovieList'));

export default function TopRatedPage() {
  const [page, setPage] = useState(1);
  const { movies, error, totalPages } = useTopRatedMovies(page);

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col max-w-full w-full mx-auto px-2 sm:px-4 md:px-8">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Suspense
            fallback={<div className="text-gray-500">Loading movies...</div>}
          >
            <MovieList movies={movies} />
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
