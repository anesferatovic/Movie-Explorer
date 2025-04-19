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
  overview: string;
  vote_average: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  videos?: MovieVideos;
  credits?: MovieCredits;
}

export interface MovieCredits {
  cast: MovieCast[];
  crew: MovieCrew[];
}

export interface MovieCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieVideos {
  results: MovieVideo[];
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
