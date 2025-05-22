import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getAnswer, requestFeedback, deleteAnswer } from "../api/AnswerResultApi";

export default function AnswerResultPage() {
  const { answerId } = useParams();
  const [result, setResult] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (result) return;

    getAnswer(answerId)
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
        navigate(-1);
      });
  }, [answerId, result, navigate]);

  if (!result) {
    return (
      <section className="max-w-5xl mx-auto p-6 text-center">
        로딩 중...
      </section>
    );
  }

  const {
    csanswer_id,
    csquestion_id,
    csquestion_category,
    csquestion_content,
    csanswer_content,
    csanswer_feedback,
  } = result;

  const handleFeedback = async () => {
    setFeedbackLoading(true);
    try {
      const res = await requestFeedback(answerId);
      if (res.data.isSuccess) {
        setResult((prev) => ({
          ...prev,
          csanswer_feedback: res.data.result.csanswer_feedback,
        }));
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("피드백 요청 중 에러가 발생했습니다.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/questions/detail/${csquestion_id}`, {
      state: {
        csquestion_id,
        csquestion_category,
        csquestion_content,
        csanswer_id,
        csanswer_content,
      },
    });
  };

  const handleDelete = () => {
    deleteAnswer(answerId).then(() => {
      alert("답변이 삭제되었습니다.");
      navigate(`/questions/detail/${csquestion_id}`);
    });
  };

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-15">
      {/* ─── 탭 ───────────────────────── */}
      <nav className="flex space-x-10 space-y-10">
        <Tab
          to={`/answer/${csanswer_id}`}
          label={`${csquestion_id}번`}
          active={location.pathname === `/answer/${csanswer_id}`}
        />
        <Tab
          to={`/myAnswers/${csquestion_id}?page=1`}
          label="내 답변"
          active={location.pathname === `/myAnswers/${csquestion_id}`}

        />
      </nav>

      {/* ─── 문제 본문 ───────────────────────── */}
      <h2 className="text-lg font-medium py-30">{csquestion_content}</h2>

      {/* ─── 답변 ───────────────────────── */}
      <div className="h-72 py-180 border rounded-md flex items-center justify-center text-xl font-semibold">
        {csanswer_content.replace(/<[^>]+>/g, "")}
      </div>

      {/* ─── AI 피드백 받기 ───────────────────────── */}
      <div className="py-100 border rounded-md p-[10px] grid place-items-center">
        {csanswer_feedback && csanswer_feedback !== "아직 피드백 없음" ? (
          <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
            {csanswer_feedback}
          </div>
        ) : (
          <button
            onClick={handleFeedback}
            disabled={feedbackLoading}
            className="px-8 py-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {feedbackLoading ? "요청 중..." : "AI 피드백 받기"}
          </button>
        )}
      </div>

      {/* ─── 수정 / 삭제 ───────────────────────── */}
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="px-5 py-2 border rounded-[10px] hover:bg-gray-50 cursor-pointer"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-5 py-2 border rounded-[10px] hover:bg-gray-50 cursor-pointer"
        >
          삭제
        </button>
      </div>
    </section>
  );
}

function Tab({ to, label, active = false }) {
  return (
    <Link
      to={to}
      className={`inline-block px-8 py-6 min-w-[80px] text-center text-lg font-medium ${
        active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-500 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );
}