import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CSQuestionTable from "../components/cs/CSQuestionTable";
import Pagination from "../components/global/Pagination";
import Category from "../components/global/Category";
import { fetchQuestions } from "../api/CSQuestionApi";

const CSQuestionBoard = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page")) || 1;
    const categoryParam = params.get("category") || "";

    setPage(pageParam);
    setCategory(categoryParam);

    fetchQuestions(pageParam, categoryParam)
      .then((data) => {
        setQuestions(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((e) => console.log(e));
  }, [location.search]);

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
    navigate(
      `/questions?page=1&category=${encodeURIComponent(e.target.value)}`
    );
  };
  return (
    <div>
      {/* 카테고리 필터링 */}
      <div>
        <Category value={category} onChange={(e) => handleSelectCategory(e)} />
      </div>

      {/* 게시판 */}
      <div className="px-120">
        <CSQuestionTable questions={questions} />
      </div>

      <Pagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        category={category}
      />
    </div>
  );
};

export default CSQuestionBoard;
