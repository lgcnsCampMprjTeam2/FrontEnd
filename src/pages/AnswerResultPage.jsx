// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
// import AnswerResultapi from '../api/AnswerResultAPI';

// export default function AnswerResultPage() {
//   const { answerId } = useParams();
//   const [result, setResult] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     AnswerResultapi
//       .get(`/answers/${answerId}`)  
//       .then(res => {
//         if (res.data.isSuccess) {
//           setResult(res.data.result);
//         } else {
//           alert(res.data.message);
//           navigate(-1);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         alert('데이터 로딩 중 에러가 발생했습니다.');
//       });
//   }, [answerId, navigate]);

//   if (!result) {
//     return (
//       <section className="max-w-5xl mx-auto p-6 text-center">
//         로딩 중...
//       </section>
//     );
//   }

//   const { csanswer_id, csquestion_id, csquestion_content, csanswer_content } = result;

//   return (
//     <section className="max-w-5xl mx-auto p-6 space-y-6">
//       {/* ─── 탭 ───────────────────────── */}
//       <nav className="flex space-x-10">
//         <AnswerTab
//           to={`/answer/${csanswer_id}`}
//           label={`${csquestion_id}번`}
//           active={location.pathname === `/answer/${csanswer_id}`}
//         />
//         <AnswerTab
//           to="/myAnswers"
//           label="내 답변"
//           active={location.pathname === '/myAnswers'}
//         />
//       </nav>

//       {/* ─── 문제 본문 ───────────────────────── */}
//       <h2 className="text-lg font-medium py-4">{csquestion_content}</h2>

//       {/* ─── 답변 ───────────────────────── */}
//       <div className="h-72 py-4 border rounded-md flex items-center justify-center text-xl font-semibold">
//         {csanswer_content}
//       </div>

//       {/* ─── AI 피드백 버튼 ───────────────────────── */}
//       <div className="py-4 border rounded-md p-2 grid place-items-center">
//         <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//           AI 피드백 받기
//         </button>
//       </div>


// }