import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/movieDetails';
import { MovieDetails, MovieCredits, MovieVideo } from '../api/utils';

export function useMovieDetails(movieId: string | number | undefined) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [trailer, setTrailer] = useState<MovieVideo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;
    getMovieDetails(movieId)
      .then((data) => {
        setMovie(data);
        setCredits(data.credits ?? null);
        const trailerVideo = data.videos?.results?.find(
          (v: MovieVideo) => v.site === 'YouTube' && v.type === 'Trailer'
        );
        setTrailer(trailerVideo ?? null);
      })
      .catch(() => setError('Failed to load movie details.'));
  }, [movieId]);

  return { movie, credits, trailer, error };
}
