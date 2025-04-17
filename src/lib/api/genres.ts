import { API_BASE_URL, API_KEY } from './utils';

interface GenreResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export async function getGenres(): Promise<GenreResponse> {
  const response = await fetch(
    `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
}
