import { API_BASE_URL, API_KEY, MovieResponse } from './utils';

export async function getTopRatedMovies(
  page: number = 1
): Promise<MovieResponse> {
  const response = await fetch(
    `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies');
  }
  return response.json();
}
