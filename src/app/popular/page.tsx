'use client';

import React, { useState, Suspense, lazy } from 'react';
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

  return (
    <main>
      <Suspense fallback={<div>Loading filters...</div>}>
        <MovieFilters
          selectedGenres={selectedGenres}
          onGenreChange={setSelectedGenres}
          year={year}
          onYearChange={setYear}
        />
      </Suspense>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <MovieList movies={movies} />
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
