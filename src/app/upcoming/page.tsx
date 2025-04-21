'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Pagination from '../components/Pagination';
import { useUpcomingMovies } from '../../lib/hooks/useUpcomingMovies';
import { useSearchStore } from '../../lib/store/searchStore';

const MovieList = lazy(() => import('../components/MovieList'));

export default function UpcomingPage() {
  const { lastPageUpcoming, setLastPageUpcoming } = useSearchStore();
  const [page, setPage] = useState(lastPageUpcoming);
  const { movies, error, totalPages } = useUpcomingMovies(page);

  useEffect(() => {
    setLastPageUpcoming(page);
  }, [page, setLastPageUpcoming]);

  return (
    <main className="flex-1 flex flex-col min-h-0 h-full">
      <div className="flex-1 flex flex-col h-full">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Suspense fallback={<div>Loading movies...</div>}>
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
