import { searchMovies } from '../api/searchMovies';
import { Movie } from '../api/utils';

export async function useSearchMovies(query: string, page: number) {
  if (!query) {
    return { movies: [], totalPages: 0, error: null };
  }
  try {
    const data = await searchMovies(query, page);
    return { movies: data.results, totalPages: data.total_pages, error: null };
  } catch {
    return { movies: [], totalPages: 0, error: 'Failed to search movies.' };
  }
}
