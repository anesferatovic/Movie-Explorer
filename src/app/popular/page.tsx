'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { usePopularMovies } from '../../lib/hooks/usePopularMovies';
import { useSearchStore } from '../../lib/store/searchStore';

const MovieFilters = lazy(() => import('../components/MovieFilters'));

export default function PopularPage() {
  const { lastPagePopular, setLastPagePopular } = useSearchStore();
  const [page, setPage] = useState(lastPagePopular);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState<number | null>(null);

  const { movies, error, totalPages } = usePopularMovies(
    page,
    selectedGenres,
    year
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    setLastPagePopular(page);
  }, [page, setLastPagePopular]);

  return (
    <main className="flex-1 flex flex-col min-h-0 h-full">
      <Suspense
        fallback={<div className="text-gray-500">Loading filters...</div>}
      >
        <MovieFilters
          selectedGenres={selectedGenres}
          onGenreChange={setSelectedGenres}
          year={year}
          onYearChange={setYear}
        />
      </Suspense>
      <div className="flex-1 flex flex-col h-full">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <MovieList movies={movies} />
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
