import { usePagination } from "../utils/usePagination";

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
  if (currentPage === 0 || paginationRange.length < 2) {
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
    <ul>
      <li onClick={onPrevious}>
        <div>{"<--"}</div>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === "...") {
          return <li>&#8230;</li>;
        }
        return <li onClick={() => onPageChange(pageNumber)}>{pageNumber}</li>;
      })}
      <li onClick={onNext}>
        <div>{"-->"}</div>
      </li>
    </ul>
  );
};
