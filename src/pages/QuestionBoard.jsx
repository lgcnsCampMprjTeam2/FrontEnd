import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/global/Pagination";
import Category from "../components/global/Category";
import BigButton from "../components/global/BigButton";
import { fetchQuestions } from "../api/QuestionApi";

const itemsPerPage = 10;
const pageGroupSize = 10;

function QuestionBoard() {
  const [questions, setQuestions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const posts = await fetchQuestions(category, searchTerm);
      setQuestions(posts);
    };

    loadData();
  }, [searchTerm, category]);

  const filtered = questions
    .filter((q) => {
      const qCategory = q.category?.trim(); // 공백 제거
      const matchesCategory = category === "전체" || qCategory === category;
      const matchesSearch = q.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.number - a.number);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const totalPageGroups = Math.ceil(totalPages / pageGroupSize);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  console.log(filtered);
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
    <main className="px-120 bg-white">
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-12 my-24">
          <label htmlFor="topics">카테고리</label>
          <Category
            value={category}
            onChange={(e) => handleCategoryChange(e)}
          />
        </div>

        <div className="flex items-center gap-12">
          <label htmlFor="search">제목 검색</label>
          <input
            id="search"
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-8 rounded-lg border border-gray-300 text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="h-39 px-12 bg-primary text-white rounded-lg text-sm"
          >
            검색
          </button>
        </div>
      </form>

      <div className="h-600">
        <div className="grid grid-cols-12 gap-4 border-b border-gray-300 py-10 text-black font-semibold select-none bg-secondary rounded-[5px]">
          <div className="col-span-1 text-center whitespace-nowrap">번호</div>
          <div className="col-span-4 text-start">글 제목</div>
          <div className="col-span-2 text-center">주제</div>
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-1 text-center">댓글 수</div>
          <div className="col-span-2 text-center">작성일</div>
        </div>

        {/* 질문 목록 */}
        <ul className="divide-y divide-gray-300">
          {pageItems.length === 0 ? (
            <li className="text-gray-500 p-4">검색 결과가 없습니다.</li>
          ) : (
            pageItems.map((problem) => (
              <li
                key={problem.number}
                className="h-48 items-center grid grid-cols-12 gap-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <div className="col-span-1 text-center text-gray-700 whitespace-nowrap">
                  {problem.number}
                </div>
                <div className="col-span-4 text-start">
                  <Link to={`./${problem.number}`} className="hover:underline">
                    {problem.title}
                  </Link>
                </div>
                <div className="col-span-2 text-center text-gray-700">
                  {problem.category}
                </div>
                <div className="col-span-2 text-center text-gray-700">
                  {problem.author}
                </div>
                <div className="col-span-1 text-center text-gray-500">
                  {problem.comments}
                </div>
                <div className="col-span-2 text-center text-gray-500">
                  {problem.date}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="flex justify-end mt-24">
        <BigButton text="글쓰기" onClick={() => navigate("/comm/post")} fill />
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
