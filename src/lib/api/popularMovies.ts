import { API_BASE_URL, API_KEY, MovieResponse } from './utils';

export async function getPopularMovies(
  page: number = 1,
  genreIds: number[] = [],
  year: number | null = null
): Promise<MovieResponse> {
  const yearQuery = year ? `&primary_release_year=${year}` : '';
  const genreQuery =
    genreIds.length > 0 ? `&with_genres=${genreIds.join(',')}` : '';
  const response = await fetch(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}${genreQuery}${yearQuery}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
}
