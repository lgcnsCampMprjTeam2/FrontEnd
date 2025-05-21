import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchAnswers } from "../api/myAnswersApi";
import Tab from "../components/global/Tab";

export default function MyAnswersPage() {
  const [answers, setAnswers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const PAGE_SIZE = 10;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page"), 10) || 1;
    const questionIdParam = params.get("questionId");

    setPage(pageParam);

    fetchAnswers(pageParam, questionIdParam)
      .then(({ content, totalPages }) => {
        const sorted = [...content].sort(
          (a, b) =>
            new Date(a.csanswer_created_at) - new Date(b.csanswer_created_at)
        );
        setAnswers(sorted);
        setTotalPages(totalPages);
      })
      .catch(console.error);
  }, [location.search]);

  const offset = (page - 1) * PAGE_SIZE;

  const from = location.state?.from || "myPage";
  const questionId = location.state?.questionId;
  const thStyle = "font-medium py-10 text-black";
  return (
    <div className="px-120">
      {/* ─── 상단 탭 ───────────────────────── */}
      <Tab
        from={from}
        title={questionId ? `${questionId}번` : "마이페이지"}
        titleTo={questionId ? `/questions/detail/${questionId}` : "/user/info"}
      />

      {/* ─── 테이블 ───────────────────────── */}
      <div className="overflow-x-auto py-40">
        <table className="w-full table-auto border-collapse">
          <thead className="text-gray-700 text-sm bg-secondary ">
            <tr className="rounded-[5px] text-center">
              <th className={`${thStyle} rounded-l-[5px]`}>번호</th>
              <th className={`${thStyle} text-start`}>문제</th>
              <th className={thStyle}>작성자</th>
              <th className={thStyle}>작성일</th>
              <th className={`${thStyle} rounded-r-[5px]`}>조회수</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {answers.map((a, idx) => (
              <tr
                key={a.csanswer_id}
                className="cursor-pointer hover:bg-gray-100 border-b border-gray-300"
                onClick={() => navigate(`/questions/detail/${a.csquestion_id}`)}
              >
                <td className="px-4 py-6 text-center">{offset + idx + 1}</td>
                {/* 문제 제목 */}
                <td className="px-2 py-6 text-start">
                  {a.csquestion_content}
                </td>
                {/* 작성자 */}
                <td className="px-4 py-6 text-center">{a.user_nickname}</td>
                {/*작성일(YYYY-MM-DD) */}
                <td className="px-4 py-6 text-center">
                  {a.csanswer_created_at.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── 페이징 ───────────────────────── */}
      <div className="flex justify-center items-center space-x-2 mt-6 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className="px-3 py-1 rounded"
            style={
              page === p
                ? { backgroundColor: "var(--color-primary)", color: "#fff" }
                : {}
            }
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          next
        </button>
      </div>
    </div>
  );
}
