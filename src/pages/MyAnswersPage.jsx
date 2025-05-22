import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchAnswers } from "../api/myAnswersApi";
import Tab from "../components/global/Tab";
import Pagination from "../components/global/Pagination";

export default function MyAnswersPage() {
  const { questionId } = useParams();
  const { search, state } = useLocation();
  const navigate = useNavigate();

  const from = state?.from || "myPage";
  const [answers, setAnswers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pageParam = parseInt(params.get("page"), 10) || 1;
    setPage(pageParam);

    fetchAnswers(pageParam, questionId)
      .then(({ content, totalPages: backendTotal }) => {
        let listToShow = content;
        if (from === "question") {
          listToShow = content
            .filter((a) => String(a.csquestion_id) === String(questionId))
            .sort(
              (a, b) =>
                new Date(a.csanswer_created_at) -
                new Date(b.csanswer_created_at)
            );
        }

        setAnswers(listToShow);
        setTotalPages(backendTotal);
      })
      .catch((err) => console.error("내 답변 조회 실패:", err));
  }, [search, questionId, from]);

  const goToPage = (p) => {
    const basePath =
      from === "question" ? `/myAnswers/${questionId}` : `/myAnswers`;
    navigate(`${basePath}?page=${p}`, { state });
  };

  const formatDate = (iso) => iso.slice(0, 10);
  const thStyle = "font-medium py-10 text-black";

  return (
    <div className="px-120">
      {/* ─── 상단 탭 ───────────────────────── */}
      <Tab
        from={from}
        title={from === "question" ? `${questionId}번` : "마이페이지"}
        titleTo={
          from === "question"
            ? `/questions/detail/${questionId}`
            : "/user/info"
        }
      />

      {/* ─── 내 답변 목록 ───────────────────────── */}
      <section>
        <h2 className="text-2xl py-36 border-b-1 border-gray-300">
        {from === "question"
            ? `${questionId}번 문제에 대한 내 답변`
            : "내가 작성한 모든 답변"}
        </h2>
        <div className="py-40 h-600">
          <table className="w-full table-auto border-collapse">
            <thead className="text-gray-700 text-sm bg-secondary ">
              <tr className="rounded-[5px] text-center">
                <th className={`${thStyle} rounded-l-[5px] w-90`}>번호</th>
                <th className={`${thStyle} text-start`}>문제</th>
                <th className={`${thStyle} w-150`}>작성자</th>
                <th className={`${thStyle} rounded-r-[5px] w-130`}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {answers.length > 0 ? (
                answers.map((a, idx) => (
                  <tr
                    key={a.csanswer_id}
                    className="cursor-pointer hover:bg-gray-100 border-b-1 border-gray-300"
                    onClick={() =>
                      navigate(`/answer/${a.csanswer_id}`, { state })
                    }
                  >
                    <td className="px-4 py-10 text-center">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-4 py-10 truncate text-start">
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

        {/* ─── 페이징 ───────────────────────── */}
        <div className="flex justify-center py-36">
          <ul className="flex items-center">
            <p
              onClick={() => goToPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="mr-32 cursor-pointer pr-16 border-r-1 border-gray-500"
            >
              prev
            </p>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li
                key={p}
                className={`w-52 h-52 flex justify-center items-center text-center rounded-[10px] ${
                  p === page ? "bg-primary text-white" : ""
                }`}
              >
                {p}
              </li>
            ))}
            <p
              onClick={() => goToPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="ml-32 cursor-pointer pl-16 border-l-1 border-gray-500"
            >
              next
            </p>
          </ul>
        </div>
      </section>
    </div>
  );
}