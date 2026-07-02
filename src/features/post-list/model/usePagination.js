import { useState, useEffect } from 'react';

export function usePagination(totalItems, initialLimit = 10) {
  const [limit, setLimit] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const goToPage = (page) => {
    const newPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(newPage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const getCurrentItems = (items) => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    return items.slice(start, end);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  return {
    currentPage,
    totalPages,
    limit,
    setLimit,
    goToPage,
    nextPage,
    prevPage,
    getCurrentItems,
  };
}