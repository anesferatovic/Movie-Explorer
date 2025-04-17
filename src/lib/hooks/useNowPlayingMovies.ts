import { useEffect, useState } from 'react';
import { getNowPlayingMovies } from '../api/nowPlayingMovies';
import { Movie } from '../api/utils';

export function useNowPlayingMovies(page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function loadNowPlayingMovies() {
      try {
        const data = await getNowPlayingMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies.');
      }
    }
    loadNowPlayingMovies();
  }, [page]);

  return { movies, error, totalPages };
}
