import React from "react";
import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";
type PaginationProps = {
  onClickChangePagination: (i: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({ onClickChangePagination }) => {
  return (
    <>
      <ReactPaginate
        className={cls.main}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => {
          onClickChangePagination(event.selected + 1);
        }}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default Pagination;
