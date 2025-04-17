import React, { useState } from 'react';

// TODO: use enum or something to avoid magic numbers
const mockCategories = [
  { id: 1, name: 'Popular' },
  { id: 2, name: 'Top Rated' },
  { id: 3, name: 'Upcoming' },
  { id: 4, name: 'Now Playing' },
];

interface MovieCategoriesProps {
  onCategorySelect: (categoryId: number) => void;
}

const MovieCategories = ({ onCategorySelect }: MovieCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <nav className="flex space-x-4 bg-gray-100 p-4 rounded-md shadow-md">
      {mockCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`px-4 py-2 rounded-md ${
            activeCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
};

export default MovieCategories;
