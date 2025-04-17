'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { useSearchMovies } from '../../lib/hooks/useSearchMovies';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<{
    movies: any[];
    totalPages: number;
    error: string | null;
  }>({ movies: [], totalPages: 0, error: null });

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query) {
      (async () => {
        const res = await useSearchMovies(query, page);
        setResult({
          movies: res.movies,
          totalPages: res.totalPages,
          error: res.error,
        });
      })();
    }
  }, [query, page]);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {!query ? (
        <p className="text-gray-500">Enter a search term above.</p>
      ) : result.error ? (
        <p className="text-red-500">{result.error}</p>
      ) : (
        <>
          <MovieList movies={result.movies} />
          <Pagination
            currentPage={page}
            totalPages={result.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  );
}
