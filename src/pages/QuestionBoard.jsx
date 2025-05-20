import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/global/Pagination";
import Category from "../components/global/Category";

const itemsPerPage = 10;
const pageGroupSize = 10;

function QuestionBoard() {
  const [questions, setQuestions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/QBoardData.json");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("질문 데이터를 가져오는데 실패했습니다:", err);
      }
    };

    fetchQuestions();
  }, []);

  const filtered = questions.filter((q) => {
    const matchesCategory = category === "전체" || q.category === category;
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const totalPageGroups = Math.ceil(totalPages / pageGroupSize);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  const groupStart = currentPageGroup * pageGroupSize + 1;
  let groupEnd = groupStart + pageGroupSize - 1;
  if (groupEnd > totalPages) groupEnd = totalPages;

  useEffect(() => {
    setCurrentPage(1);
    setCurrentPageGroup(0);
  }, [searchTerm, category]);

  useEffect(() => {
    const newPageGroup = Math.floor((currentPage - 1) / pageGroupSize);
    setCurrentPageGroup(newPageGroup);
  }, [currentPage]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setCurrentPageGroup(0);
  };

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto bg-white min-h-screen">
      <form onSubmit={handleSearchSubmit} className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="topic" className="mr-2 font-semibold text-gray-700">
            주제:
          </label>
          <Category value={category} onChange={(e) => handleCategoryChange(e)} />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="font-semibold text-gray-700">
            제목 검색:
          </label>
          <input
            id="search"
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-4 py-2 rounded shadow-sm text-gray-700"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            검색
          </button>
        </div>
      </form>

      <div className="grid grid-cols-12 gap-4 border-b border-gray-300 pb-2 text-black font-semibold select-none bg-[#C6E3FE]">
        <div className="col-span-1 text-center whitespace-nowrap">번호</div>
        <div className="col-span-3 text-center">글 제목</div>
        <div className="col-span-2 text-center">주제</div>
        <div className="col-span-2 text-center">작성자</div>
        <div className="col-span-1 text-center">댓글 수</div>
        <div className="col-span-1 text-center">추천 수</div>
        <div className="col-span-2 text-center">작성일</div>
      </div>

      {/* 질문 목록 */}
      <ul className="divide-y divide-gray-200">
        {pageItems.length === 0 ? (
          <li className="text-gray-500 p-4">검색 결과가 없습니다.</li>
        ) : (
          pageItems.map((problem) => (
            <li
              key={problem.number}
              className="grid grid-cols-12 gap-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="col-span-1 text-center text-gray-700 whitespace-nowrap">{problem.number}</div>
              <div className="col-span-3 text-center">
                <Link to={`./${problem.number}`} className="hover:underline">
                  {problem.title}
                </Link>
              </div>
              <div className="col-span-2 text-center text-gray-700">{problem.category}</div>
              <div className="col-span-2 text-center text-gray-700">{problem.author}</div>
              <div className="col-span-1 text-center text-gray-500">{problem.comments}</div>
              <div className="col-span-1 text-center text-gray-500">{problem.likes}</div>
              <div className="col-span-2 text-center text-gray-500">{problem.date}</div>
            </li>
          ))
        )}
      </ul>
      <div className="flex justify-end mt-5 mr-40">
        <Link to="./post"
          className="bg-blue-600 hover:bg-blue-700 text-white px-30 py-1 rounded"
        >글쓰기
        </Link>
      </div>
      {/* 페이지네이션 */}
      <Pagination
        totalPages={totalPages}
        page={currentPage}
        setPage={setCurrentPage}
        category={category}
      />
    </main>
  );
}

export default QuestionBoard;
