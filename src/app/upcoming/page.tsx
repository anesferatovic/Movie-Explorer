'use client';

import React, { useState, Suspense, lazy } from 'react';
import Pagination from '../components/Pagination';
import { useUpcomingMovies } from '../../lib/hooks/useUpcomingMovies';

const MovieList = lazy(() => import('../components/MovieList'));

export default function UpcomingPage() {
  const [page, setPage] = useState(1);
  const { movies, error, totalPages } = useUpcomingMovies(page);

  return (
    <main>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Suspense fallback={<div>Loading movies...</div>}>
            <MovieList movies={movies} />
          </Suspense>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  );
}
