'use client';

import React, { useState, Suspense, lazy } from 'react';
import Pagination from '../components/Pagination';
import { useTopRatedMovies } from '../../lib/hooks/useTopRatedMovies';

const MovieList = lazy(() => import('../components/MovieList'));

export default function TopRatedPage() {
  const [page, setPage] = useState(1);
  const { movies, error, totalPages } = useTopRatedMovies(page);

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
