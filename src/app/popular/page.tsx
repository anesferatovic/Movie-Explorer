'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { usePopularMovies } from '../../lib/hooks/usePopularMovies';

const MovieFilters = lazy(() => import('../components/MovieFilters'));

export default function PopularPage() {
  const [page, setPage] = useState(1);
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

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <Suspense
        fallback={
          <div className="text-gray-500 px-2 sm:px-4 md:px-8">
            Loading filters...
          </div>
        }
      >
        <MovieFilters
          selectedGenres={selectedGenres}
          onGenreChange={setSelectedGenres}
          year={year}
          onYearChange={setYear}
        />
      </Suspense>
      <div className="flex-1 flex flex-col max-w-full w-full mx-auto px-2 sm:px-4 md:px-8">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <MovieList movies={movies} />
        )}
        {movies.length > 10 && (
          <div className="mt-auto flex justify-center pt-8 pb-8">
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
