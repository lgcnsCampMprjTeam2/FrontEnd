import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CSQuestionTable from "../components/cs/CSQuestionTable";
import Pagination from "../components/global/Pagination";
import axios from "axios";
import Category from "../components/global/Category";

const CSQuestionBoard = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchQuestions = async (page, category) => {
    try {
      const res = await axios.get("/api/questions", {
        params: {
          page: page,
          category: category || undefined,
        },
      });

      const data = res.data;
      setQuestions(data.result.content);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page")) || 1;
    const categoryParam = params.get("category") || "";

    setPage(pageParam);
    setCategory(categoryParam);

    fetchQuestions(pageParam, categoryParam);
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
