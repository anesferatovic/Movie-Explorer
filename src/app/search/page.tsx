'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { useSearchMovies } from '../../lib/hooks/useSearchMovies';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
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
    <main className="flex-1 flex flex-col min-h-screen">
      <div className="flex flex-col flex-1 max-w-full w-full mx-auto px-2 sm:px-4 md:px-8">
        <h1 className="text-gray-500 text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Search Results{query ? `: ${query}` : ''}
        </h1>
        {!query ? (
          <p className="text-gray-500 px-2 sm:px-4 md:px-8">
            Enter a search term above.
          </p>
        ) : result.error ? (
          <p className="text-red-500 px-2 sm:px-4 md:px-8">{result.error}</p>
        ) : (
          <MovieList movies={result.movies} />
        )}
        {result.movies.length > 10 && (
          <div className="mt-auto flex justify-center pb-8">
            <Pagination
              currentPage={page}
              totalPages={result.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </main>
  );
}
