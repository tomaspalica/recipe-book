import { usePagination } from "../utils/usePagination";
import { nanoid } from "nanoid";
export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  
  return (
    <ul className="pagination-list">
      <li className="pagination-list-arrow" onClick={onPrevious}>
        <div>{"<--"}</div>
      </li>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === "...") {
          return (
            <li  key={nanoid()}>
              &#8230;
            </li>
          );
        }
        if (pageNumber == currentPage) {
          return (
            <li
              className="pagination-list-elements pagination-list-elements-active"
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        }
        return (
          <li
            className="pagination-list-elements"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className="pagination-list-arrow" onClick={onNext}>
        <div>{"-->"}</div>
      </li>
    </ul>
  );
};
