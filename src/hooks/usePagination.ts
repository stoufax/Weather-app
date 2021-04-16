import { useState } from 'react';

export function usePagination<T>(data: Array<T> = [], limit: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / limit);

  const begin = (currentPage - 1) * limit;
  const end = begin + limit;
  const currentData = data.slice(begin, end);

  function setNextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }

  function setPreviousPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  const isPreviousEnabled = currentPage > 1;

  const isNextEnabled = currentPage < totalPages;

  return { setNextPage, setPreviousPage, currentData, isNextEnabled, isPreviousEnabled };
}
