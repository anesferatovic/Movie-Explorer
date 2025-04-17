export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = '4d475a6aee0e49aa4c56ce728cb15491';

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}
