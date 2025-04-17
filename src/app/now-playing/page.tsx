'use client';

import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { useNowPlayingMovies } from '../../lib/hooks/useNowPlayingMovies';

export default function NowPlayingPage() {
  const [page, setPage] = useState(1);
  const { movies, error, totalPages } = useNowPlayingMovies(page);

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
