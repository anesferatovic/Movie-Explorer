'use client';

import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import MovieFilters from '../components/MovieFilters';
import { usePopularMovies } from '../../lib/hooks/usePopularMovies';

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
      <MovieFilters
        selectedGenres={selectedGenres}
        onGenreChange={setSelectedGenres}
        year={year}
        onYearChange={setYear}
      />
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
