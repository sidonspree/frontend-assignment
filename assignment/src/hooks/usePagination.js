import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  if (start > end) return [];
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export const usePagination = ({ currentPage, totalRecords, pageSize }) => {
  const paginationRange = useMemo(() => {
    if (pageSize <= 0 || totalRecords <= 0) return [];
    
    const totalPageCount = Math.ceil(totalRecords / pageSize);
    const totalPageNumbers = 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 5);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPageCount - 4, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return range(1, totalPageCount); // Fallback case
  }, [totalRecords, pageSize, currentPage]);

  return paginationRange;
};
