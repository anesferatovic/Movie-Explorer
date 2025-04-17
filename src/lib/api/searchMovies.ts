import { API_BASE_URL, API_KEY, MovieResponse } from './utils';

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieResponse> {
  const response = await fetch(
    `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  return response.json();
}
