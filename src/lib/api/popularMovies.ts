import { API_BASE_URL, API_KEY, MovieResponse } from './utils';

// TODO: Dodati year query param za filteriranje filmova po godini
export async function getPopularMovies(
  page: number = 1,
  genreId: number | null = null
): Promise<MovieResponse> {
  const genreQuery = genreId ? `&with_genres=${genreId}` : '';
  const response = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}${genreQuery}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
}
