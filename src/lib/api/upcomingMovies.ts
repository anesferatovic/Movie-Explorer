import { API_BASE_URL, API_KEY, MovieResponse } from './utils';

export async function getUpcomingMovies(
  page: number = 1
): Promise<MovieResponse> {
  const response = await fetch(
    `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  return response.json();
}
