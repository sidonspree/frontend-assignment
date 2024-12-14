import PropTypes from 'prop-types';
import { usePagination, DOTS } from "../../hooks";
import styles from './Pagination.module.css'

export const Pagination = (props) => {
  const {
    onNavigate,
    totalRecords,
    currentPage,
    pageSize
  } = props;



  const paginationRange = usePagination({
    currentPage,
    totalRecords,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onNavigate(currentPage + 1);
  };

  const onPrevious = () => {
    onNavigate(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.paginationContainer}>
      <button
        className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ""}`}
        onClick={onPrevious}
        tabIndex={0}
      >
        <div className={styles.arrow + " " + styles.left} />
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <button key={index} className={`${styles.paginationItem} ${styles.dots}`}>
              &#8230;
            </button>
          );
        }
        return (
          <button
            tabIndex={0}
            key={`${pageNumber}-${index}`}
            className={`${styles.paginationItem} ${pageNumber === currentPage ? styles.selected : ""
              }`}
            onClick={() => onNavigate(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ""}`}
        onClick={onNext}
        tabIndex={0}
      >
        <div className={styles.arrow + " " + styles.right} />
      </button>
    </ul>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number,
  onNavigate: PropTypes.func,
  totalRecords: PropTypes.number,
  currentPage: PropTypes.number,
}