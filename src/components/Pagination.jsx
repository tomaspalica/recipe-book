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
      <li onClick={onPrevious}>
        <div>{"<--"}</div>
      </li>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === "...") {
          return <li key={nanoid()}>&#8230;</li>;
        }
        return (
          <li key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li onClick={onNext}>
        <div>{"-->"}</div>
      </li>
    </ul>
  );
};
