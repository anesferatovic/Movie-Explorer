import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const safeOnPageChange = (page: number) => {
    if (
      typeof page === 'number' &&
      page >= 1 &&
      page <= totalPages &&
      page !== currentPage
    ) {
      onPageChange(page);
    }
  };

  if (!totalPages || totalPages < 1) return null;

  if (currentPage > totalPages) {
    setTimeout(() => safeOnPageChange(totalPages > 0 ? totalPages : 1), 0);
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {pageNumbers.map((num, idx) =>
        typeof num === 'number' ? (
          <button
            key={num}
            onClick={() => safeOnPageChange(num)}
            className={`px-3 py-2 rounded border transition-colors
              ${
                num === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100'
              }
              cursor-pointer
            `}
            aria-current={num === currentPage ? 'page' : undefined}
            disabled={num === currentPage}
          >
            {num}
          </button>
        ) : (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 py-2 text-gray-400 select-none"
          >
            ...
          </span>
        )
      )}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
