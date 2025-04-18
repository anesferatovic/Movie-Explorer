import { API_BASE_URL, API_KEY, MovieDetails } from './utils';

export async function getMovieDetails(
  movieId: string | number
): Promise<MovieDetails> {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
}
