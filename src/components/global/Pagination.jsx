import React from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ totalPages, page, setPage, category }) => {
  const navigate = useNavigate();
  const startPage = Math.floor((page - 1) / 10) * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);
  // const endPage = startPage + 9;

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handleClickPage = (pageNum) => {
    setPage(pageNum);
    navigate(`?page=${pageNum}&category=${category}`);
  };

  const handleNext = () => {
    if (endPage < totalPages) {
      setPage(endPage + 1);
      navigate(`?page=${endPage + 1}&category=${category}`);
    }
  };

  const handlePrev = () => {
    if (startPage > 1) {
      setPage(startPage - 1);
      navigate(`?page=${startPage - 1}&category=${category}`);
    }
  };

  return (
    <div className="flex justify-center py-36">
      <ul className="flex items-center">
        <p onClick={handlePrev} className="mr-32 cursor-pointer pr-16 border-r-1 border-gray-500">
          prev
        </p>
        {pages.map((p) => {
          return (
            <li
              className={`w-52 h-52 flex justify-center items-center text-center rounded-[10px] cursor-pointer  ${
                p === page ? "bg-primary text-white" : "hover:bg-primary/15"
              }`}
              key={p}
              onClick={() => handleClickPage(p)}
            >
              {p}
            </li>
          );
        })}
        <p onClick={handleNext} className="ml-32 cursor-pointer pl-16 border-l-1 border-gray-500" >
          next
        </p>
      </ul>
    </div>
  );
};

export default Pagination;
