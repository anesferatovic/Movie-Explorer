import { useEffect, useState } from 'react';
import { getTopRatedMovies } from '../api/topRatedMovies';
import { Movie } from '../api/utils';

export function useTopRatedMovies(page: number, genreId: number | null) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function loadTopRatedMovies() {
      try {
        const data = await getTopRatedMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
      }
    }
    loadTopRatedMovies();
  }, [page]);

  return { movies, error, totalPages };
}
