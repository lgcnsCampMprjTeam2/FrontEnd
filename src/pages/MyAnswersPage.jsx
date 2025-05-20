import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


// export default function MyQuestionsPage() {
//   const [answers, setAnswers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // 내 질문 목록 조회 (페이징)
//     axios
//       .get('/api/answers/mine', { params: { page } })
//       .then((res) => {
//         setAnswers(res.data.items);
//         setTotalPages(res.data.totalPages);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [page]);


//  더미 데이터 
const dummyAnswers = Array.from({ length: 50 }, (_, idx) => ({
  id: 50 - idx,                     // 답변 번호
  questionId: 123456,               // 문제 식별자 (모두 동일한 값, UI 확인용)
  author: '작성자',                  // 작성자
  createdAt: '2025-05-16',          // 작성일
  views: '0' // 조회수 
}));

export default function MyAnswersPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const totalPages   = Math.ceil(dummyAnswers.length / itemsPerPage);
  const pagedAnswers = dummyAnswers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* ─── 상단 탭 ───────────────────────── */}
      <nav className="flex  mb-6">
        <Link
          to="/myAnswers"
          className="inline-block px-8 py-4 min-w-[80px] text-center text-lg font-medium border-b-2"
          style={{
            color:       'var(--color-primary)',
            borderColor: 'var(--color-primary)',
          }}
        >
          내 답변
        </Link>
      </nav>

      {/* ─── 테이블 ───────────────────────── */}
      <div className="overflow-x-auto py-40">
        <table className="min-w-full table-auto border-collapse">
          <thead
            className="text-gray-700 text-sm"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <tr>
              <th className="px-4 py-3 text-center">번호</th>
              <th className="px-4 py-3 text-center">문제</th>
              <th className="px-4 py-3 text-center">작성자</th>
              <th className="px-4 py-3 text-center">작성일</th>
              <th className="px-4 py-3 text-center">조회수</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pagedAnswers.map((ans) => (
              <tr
                key={ans.id}
                className="cursor-pointer hover:bg-gray-100 border-b-1"
                style={{ borderColor: 'var(--color-gray-300)' }}
                onClick={() => navigate(`/questions/${ans.questionId}`)}
              >
                <td className="px-4 py-10 text-center">{ans.id}</td>
                <td className="px-4 py-10 text-center">{ans.questionId}</td>
                <td className="px-4 py-10 text-center">{ans.author}</td>
                <td className="px-4 py-10 text-center">{ans.createdAt}</td>
                <td className="px-4 py-10 text-center">{ans.views}</td>
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
                ? { backgroundColor: 'var(--color-primary)', color: '#fff' }
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