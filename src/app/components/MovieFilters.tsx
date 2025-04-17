import React from 'react';
import { useGenres } from '../../lib/hooks/useGenres';

interface MovieFiltersProps {
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

//TODO: dodati opciju multiple genres u isto vrijeme

const MovieFilters = ({ selectedGenre, onGenreChange }: MovieFiltersProps) => {
  const { genres, error } = useGenres();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mb-6">
      <label
        htmlFor="genre"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Genre
      </label>
      <select
        id="genre"
        value={selectedGenre || ''}
        onChange={(e) =>
          onGenreChange(e.target.value ? parseInt(e.target.value, 10) : null)
        }
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieFilters;
