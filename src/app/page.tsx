'use client';

import React, { useState } from 'react';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';
import MovieFilters from './components/MovieFilters';
import { usePopularMovies } from '../lib/hooks/usePopularMovies';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const { movies, error, totalPages } = usePopularMovies(
    currentPage,
    selectedGenres,
    year
  );

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Movie Explorer</h1>
      </header>
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
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
