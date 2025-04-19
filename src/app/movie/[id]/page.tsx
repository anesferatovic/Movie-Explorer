'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMovieDetails } from '../../../lib/hooks/useMovieDetails';
import { useSearchStore } from '../../../lib/store/searchStore';
import { useFavoritesStore } from '../../../lib/store/favoritesStore';
import { useUserStore } from '../../../lib/store/userStore';

function getImageUrl(path: string | null, size: string = 'w500') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
}

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { setSearch } = useSearchStore();
  const {
    toggleFavorite,
    toggleWatchlist,
    isFavorite,
    isInWatchlist,
    clearAll,
  } = useFavoritesStore();
  const { user } = useUserStore();
  const movieId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('clear-search-input'));
  }, []);

  useEffect(() => {
    setSearch('');
  }, []);

  useEffect(() => {
    if (window && window.location.search.includes('q=')) {
      router.replace(`/movie/${movieId}`);
    }
  }, []);

  useEffect(() => {
    if (!user) clearAll();
  }, [user, clearAll]);

  const { movie, credits, trailer, error } = useMovieDetails(movieId);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!movie) return <div className="p-8">Loading...</div>;

  const directors =
    credits?.crew?.filter((c: any) => c.job === 'Director') || [];

  const cast = credits?.cast?.slice(0, 8) || [];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div
          className="absolute inset-0 h-96 w-full bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${getImageUrl(
              movie.backdrop_path,
              'w1280'
            )})`,
            zIndex: 0,
          }}
        />
      )}
      <div className="relative z-10 flex flex-col md:flex-row max-w-5xl mx-auto pt-12 pb-8 px-4">
        {/* Poster */}
        <div className="flex-shrink-0 w-64">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        {/* Details */}
        <div className="md:ml-8 mt-6 md:mt-0 flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 font-semibold mr-2">IMDB:</span>
            <span className="text-lg">{movie.vote_average?.toFixed(1)}</span>
            <span className="ml-4 text-gray-300">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>
          <p className="mb-4 text-gray-200">{movie.overview}</p>
          {/* Directors */}
          {directors.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">
                Director{directors.length > 1 ? 's' : ''}:
              </span>{' '}
              {directors.map((d: any) => d.name).join(', ')}
            </div>
          )}
          {/* Cast */}
          {cast.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Cast:</span>{' '}
              {cast.map((c: any) => c.name).join(', ')}
            </div>
          )}
          {/* Action buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => user && toggleFavorite(movie.id)}
              disabled={!user}
              className={`px-4 py-2 rounded-md font-semibold ${
                isFavorite(movie.id)
                  ? 'bg-red-600'
                  : 'bg-gray-700 hover:bg-red-500'
              } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={
                user
                  ? isFavorite(movie.id)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'
                  : 'Sign in to use favorites'
              }
            >
              {isFavorite(movie.id) ? 'Favorited' : 'Add to Favorites'}
            </button>
            <button
              onClick={() => user && toggleWatchlist(movie.id)}
              disabled={!user}
              className={`px-4 py-2 rounded-md font-semibold ${
                isInWatchlist(movie.id)
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-blue-500'
              } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={
                user
                  ? isInWatchlist(movie.id)
                    ? 'Remove from Watchlist'
                    : 'Add to Watchlist'
                  : 'Sign in to use watchlist'
              }
            >
              {isInWatchlist(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
            {/* Share buttons */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700"
            >
              Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-300 text-black"
            >
              Share on Twitter
            </a>
          </div>
          {/* Trailer */}
          {trailer && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
