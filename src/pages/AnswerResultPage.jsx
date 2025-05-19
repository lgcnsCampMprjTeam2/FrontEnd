import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const mockAnswer = { id: 123, questionId: 1000, content: " 답변 내용 예시입니다." };
const mockQuestion = { id: 1000, content: "문제 본문 예시입니다." };

export default function AnswerResultPage() {
    const answer = mockAnswer;
    const question = mockQuestion;

    return (
        <section className="max-w-5xl mx-auto p-6 space-y-15">
            {/* 탭 ---------------------------------------------------- */}
            <nav className="flex space-x-10 space-y-10">
                <AnswerTab to="#" label={`${question.id}번`} active />
                <AnswerTab to="#" label="내 답변" />
            </nav>

            {/* 문제 본문 ------------------------------------------------ */}
            <h2 className="text-lg font-medium py-20">{question.content}</h2>

            {/* 답변  ----------------------------------------------------- */}
            <div className="h-72 py-180 border rounded-md flex items-center justify-center text-xl font-semibold ">
                {answer.content}
            </div>

            {/* AI 피드백 ----------------------------------------------- */}
            <div className="py-70 border rounded-md p-[10px] grid place-items-center">
                <button className="px-6 py-8 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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


function AnswerTab({ to, label, active = false }) {
  return (
    <Link
      to={to}
      className={`inline-block px-8 py-6 min-w-[80px] text-center text-lg font-medium
                  ${active
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"}`}
    >
      {label}
    </Link>
  );
}