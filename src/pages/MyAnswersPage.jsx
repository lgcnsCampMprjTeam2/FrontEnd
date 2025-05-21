import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Tab from '../components/global/Tab';


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
  const location = useLocation();

  const itemsPerPage = 10;
  const totalPages   = Math.ceil(dummyAnswers.length / itemsPerPage);
  const pagedAnswers = dummyAnswers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  const from = location.state?.from || "myPage";
  const questionId = location.state?.questionId;
  const thStyle = "font-medium py-10 text-black";
  return (
    <div className="px-120">
      {/* ─── 상단 탭 ───────────────────────── */}
      <Tab
        from={from}
        title={questionId?`${questionId}번`:"마이페이지"}
        titleTo={questionId?`/questions/detail/${questionId}`:"/user/info"}
      />

      {/* ─── 테이블 ───────────────────────── */}
      <div className="overflow-x-auto py-40">
        <table className="w-full table-auto border-collapse">
          <thead
            className="text-gray-700 text-sm bg-secondary "
          >
            <tr className='rounded-[5px] text-center'>
              <th className={`${thStyle} rounded-l-[5px]`}>번호</th>
              <th className={`${thStyle} text-start`}>문제</th>
              <th className={thStyle}>작성자</th>
              <th className={thStyle}>작성일</th>
              <th className={`${thStyle} rounded-r-[5px]`}>조회수</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pagedAnswers.map((ans) => (
              <tr
                key={ans.id}
                className="cursor-pointer hover:bg-gray-100 border-b-1"
                style={{ borderColor: "var(--color-gray-300)" }}
                onClick={() => navigate(`/answer/${ans.questionId}`)}
              >
                <td className="px-4 py-10 text-center">{ans.id}</td>
                <td className="px-4 py-10 text-start">{ans.questionId}</td>
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