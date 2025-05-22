import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchAnswers } from "../api/myAnswersApi";
import Tab from "../components/global/Tab";

export default function MyAnswersPage() {
  const { questionId } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pageParam = parseInt(params.get("page"), 10) || 1;
    setPage(pageParam);

    fetchAnswers(pageParam, questionId)
      .then(({ content }) => {
        // 1) questionId와 일치하는 항목만 필터링
        const filtered = content.filter(
          (a) => String(a.csquestion_id) === String(questionId)
        );
        // 2) 작성일 오름차순 정렬
        const sorted = filtered.sort(
          (a, b) =>
            new Date(a.csanswer_created_at) - new Date(b.csanswer_created_at)
        );
        setAnswers(sorted);
        // 3) 총 페이지 수 재계산
        setTotalPages(Math.ceil(filtered.length / PAGE_SIZE) || 1);
      })
      .catch((err) => {
        console.error("내 답변 조회 실패:", err);
      });
  }, [search, questionId]);

  const goToPage = (p) => {
    navigate(`/myAnswers/${questionId}?page=${p}`);
  };

  // YYYY-MM-DD
  const formatDate = (iso) => iso.slice(0, 10);

  return (
    <section className="px-120">
      <h2 className="text-2xl font-semibold py-12">
        {questionId}번 문제에 대한 내 답변
      </h2>

      <div className="overflow-x-auto py-10">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-secondary text-gray-700">
            <tr className="text-center">
              <th className="font-medium py-4">번호</th>
              <th className="font-medium py-4 text-center">문제</th>
              <th className="font-medium py-4 text-center">작성자</th>
              <th className="font-medium py-4">작성일</th>
            </tr>
          </thead>
          <tbody>
            {answers.length > 0 ? (
              answers.map((a, idx) => (
                <tr
                  key={a.csanswer_id}
                  className="cursor-pointer hover:bg-gray-100 border-b"
                  onClick={() =>
                    navigate(`/answer/${a.csanswer_id}`)
                  }
                >
                  <td className="px-4 py-10 text-center">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-10 truncate text-center">
                    {a.csquestion_content}
                  </td>
                  <td className="px-4 py-10 text-center">
                    {a.user_nickname}
                  </td>
                  <td className="px-4 py-10 text-center">
                    {formatDate(a.csanswer_created_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  아직 작성한 답변이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이징 */}
      <div className="flex justify-center items-center space-x-2 mt-4 text-sm">
        <button
          onClick={() => goToPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded ${
              page === p ? "bg-primary text-white" : ""
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => goToPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}