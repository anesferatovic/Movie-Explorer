import { useEffect, useState } from 'react';
import { getGenres } from '../api/genres';

interface Genre {
  id: number;
  name: string;
}

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();
        setGenres(data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Failed to load genres.');
      }
    }
    fetchGenres();
  }, []);

  return { genres, error };
}
