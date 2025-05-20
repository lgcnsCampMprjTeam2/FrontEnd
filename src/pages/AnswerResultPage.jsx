import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

export default function AnswerResultPage() {
    const { answerId } = useParams();               
    const [result, setResult] = useState(null);     
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/answer/${answerId}`)
            .then((res) => {
                if (res.data.isSuccess) {
                    setResult(res.data.result);
                } else {
                    alert(res.data.message);
                    navigate(-1);
                }
            })
            .catch((err) => {
                console.error(err);
                alert("데이터 로딩 중 에러가 발생했습니다.");
            }); 
    }, [answerId, navigate]);

    if (!result) {
        return (
            <section className="max-w-5xl mx-auto p-6 text-center">
                로딩 중...
            </section>
        );
    }

    return (
        <section className="max-w-5xl mx-auto p-6 space-y-6">
            {/* 탭 ---------------------------------------------------- */}
            <nav className="flex space-x-10">
                <AnswerTab
                    to={`/answer/${result.csanswer_id}`}
                    label={`${result.csquestion_id}번`}
                    active={location.pathname === `/answer/${result.csanswer_id}`}
                />
                <AnswerTab
                    to="/myAnswers"
                    label="내 답변"
                    active={location.pathname === "/myAnswers"}
                />
            </nav>

            {/* 문제 본문 ------------------------------------------------ */}
            <h2 className="text-lg font-medium py-4">
                {result.csquestion_content}
            </h2>

            {/* 답변  ----------------------------------------------------- */}
            <div className="h-72 py-4 border rounded-md flex items-center justify-center text-xl font-semibold">
                {result.csanswer_content}
            </div>

            {/* AI 피드백 ----------------------------------------------- */}
            <div className="py-4 border rounded-md p-2 grid place-items-center">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    AI 피드백 받기
                </button>
            </div>

            {/* 수정 / 삭제 ------------------------------------------- */}
            <div className="flex space-x-2">
                <button className="px-5 py-2 border rounded-[10px] hover:bg-gray-50">
                    수정
                </button>
                <button className="px-5 py-2 border rounded-[10px] hover:bg-gray-50">
                    삭제
                </button>
            </div>
        </section>
    );
}

// function AnswerTab({ to, label, active = false }) {
//     return (
//         <Link
//             to={to}
//             className={`inline-block px-8 py-4 min-w-[80px] text-center text-lg font-medium
//         ${active
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-blue-600"
//                 }`}
//         >
//             {label}
//         </Link>
//     );
// }