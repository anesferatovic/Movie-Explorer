'use client';

import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { useTopRatedMovies } from '../../lib/hooks/useTopRatedMovies';

export default function TopRatedPage() {
  const [page, setPage] = useState(1);
  const { movies, error, totalPages } = useTopRatedMovies(page);

  return (
    <main>
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
