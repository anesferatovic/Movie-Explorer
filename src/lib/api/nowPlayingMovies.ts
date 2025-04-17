import { API_BASE_URL, API_KEY, MovieResponse } from './utils';

export async function getNowPlayingMovies(
  page: number = 1
): Promise<MovieResponse> {
  const response = await fetch(
    `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch now playing movies');
  }
  return response.json();
}
