import React from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '../../lib/store/favoritesStore';
import { useUserStore } from '../../lib/store/userStore';
import { Movie } from '@/lib/api/utils';

const MovieList = ({ movies }: { movies: Movie[] }) => {
  const { toggleFavorite, toggleWatchlist, isFavorite, isInWatchlist } =
    useFavoritesStore();
  const { user } = useUserStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-4 md:px-8">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg min-w-0"
        >
          <Link href={`/movie/${movie.id}`}>
            <div className="w-full h-60 overflow-hidden cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent">
            <h3 className="text-white text-sm font-semibold">{movie.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 font-semibold mr-1">★</span>
              <span className="text-white text-xs font-medium">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
            {movie.overview && (
              <div className="mt-1 rounded p-1 bg-gradient-to-t from-gray-800/80 via-gray-800/60 to-transparent">
                <p className="text-xs text-gray-200 line-clamp-3">
                  {movie.overview}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => user && toggleFavorite(movie.id)}
            disabled={!user}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite(movie.id)
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-red-400 ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={
              user
                ? isFavorite(movie.id)
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'
                : 'Sign in to use favorites'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button
            onClick={() => user && toggleWatchlist(movie.id)}
            disabled={!user}
            className={`absolute top-2 right-12 p-2 rounded-full ${
              isInWatchlist(movie.id)
                ? 'bg-blue-400 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-400 hover:text-white ${
              !user ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={
              user
                ? isInWatchlist(movie.id)
                  ? 'Remove from Watchlist'
                  : 'Add to Watchlist'
                : 'Sign in to use watchlist'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.87 0-7-2.69-7-6s3.13-6 7-6 7 2.69 7 6-3.13 6-7 6zm0-10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
