import { usePopularMovies } from './usePopularMovies';
import { useTopRatedMovies } from './useTopRatedMovies';
import { useUpcomingMovies } from './useUpcomingMovies';
import { useNowPlayingMovies } from './useNowPlayingMovies';

interface UseMoviesParams {
  category: number;
  page: number;
  genres?: number[];
  year?: number | null;
}

export function useMovies({
  category,
  page,
  genres = [],
  year = null,
}: UseMoviesParams) {
  const popular = usePopularMovies(page, genres, year);
  const topRated = useTopRatedMovies(page);
  const upcoming = useUpcomingMovies(page);
  const nowPlaying = useNowPlayingMovies(page);

  // TODO: use enum or something to avoid magic numbers
  switch (category) {
    case 1:
      return popular;
    case 2:
      return topRated;
    case 3:
      return upcoming;
    case 4:
      return nowPlaying;
    default:
      return { movies: [], error: 'Invalid category', totalPages: 0 };
  }
}
