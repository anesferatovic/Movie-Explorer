import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useGenres } from '../../lib/hooks/useGenres';

interface MovieFiltersProps {
  selectedGenres: number[];
  onGenreChange: (genreIds: number[]) => void;
  year: number | null;
  onYearChange: (year: number | null) => void;
}

const MovieFilters = ({
  selectedGenres,
  onGenreChange,
  year,
  onYearChange,
}: MovieFiltersProps) => {
  const { genres, error } = useGenres();
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () =>
      Array.from({ length: currentYear - 1888 + 1 }, (_, i) => currentYear - i),
    [currentYear]
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tempSelectedGenres, setTempSelectedGenres] = useState<number[]>([
    ...selectedGenres,
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedGenreNames = useMemo(
    () =>
      genres
        .filter((genre) => selectedGenres.includes(genre.id))
        .map((genre) => genre.name)
        .join(', '),
    [genres, selectedGenres]
  );

  const toggleGenre = useCallback((genreId: number) => {
    setTempSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  }, []);

  const applyGenreSelection = useCallback(() => {
    onGenreChange(tempSelectedGenres);
    setIsDropdownOpen(false);
  }, [tempSelectedGenres, onGenreChange]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, handleClickOutside]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex mb-6 space-y-4">
      <div>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-left cursor-pointer"
          >
            {selectedGenres.length > 0 ? selectedGenreNames : 'All Genres'}
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              <div className="max-h-48 overflow-y-auto">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className={`p-2 cursor-pointer hover:bg-blue-100 ${
                      tempSelectedGenres.includes(genre.id)
                        ? 'bg-blue-100 text-blue-800'
                        : ''
                    }`}
                    onClick={() => toggleGenre(genre.id)}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-300 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={applyGenreSelection}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <select
          id="year"
          value={year || ''}
          onChange={(e) =>
            onYearChange(e.target.value ? parseInt(e.target.value, 10) : null)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MovieFilters;
