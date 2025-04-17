import React, { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MovieList = ({ movies }: { movies: Movie[] }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const handleFavoriteToggle = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(movie.id)) {
        updatedFavorites.delete(movie.id);
      } else {
        updatedFavorites.add(movie.id);
      }
      return updatedFavorites;
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
          <div className="w-full h-60 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
            <h3 className="text-white text-sm font-semibold">{movie.title}</h3>
          </div>
          <button
            onClick={() => handleFavoriteToggle(movie)}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              favorites.has(movie.id)
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-red-400`}
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
        </div>
      ))}
    </div>
  );
};

export default MovieList;
