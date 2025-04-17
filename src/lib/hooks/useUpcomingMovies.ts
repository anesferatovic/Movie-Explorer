import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../api/upcomingMovies';
import { Movie } from '../api/utils';

export function useUpcomingMovies(page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function loadUpcomingMovies() {
      try {
        const data = await getUpcomingMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
      }
    }
    loadUpcomingMovies();
  }, [page]);

  return { movies, error, totalPages };
}
