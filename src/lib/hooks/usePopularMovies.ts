import { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/popularMovies';
import { Movie } from '../api/utils';

export function usePopularMovies(
  page: number,
  genreIds: number[],
  year: number | null
) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies(page, genreIds, year);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
      }
    }
    loadMovies();
  }, [page, genreIds, year]);

  return { movies, error, totalPages };
}
