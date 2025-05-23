import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getAnswer,
  requestFeedback,
  deleteAnswer,
} from "../api/AnswerResultApi";
import Tab from "../components/global/Tab";
import BigButton from "../components/global/BigButton";

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

  const parseBold = (text) => {
    const parts = text.split(/(\*\*.+?\*\*)/g);

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };
  
  return (
    <section className="px-120">
      {/* ─── 탭 ───────────────────────── */}
      <Tab
        title={`${csquestion_id}번`}
        titleTo={`/questions/detail/${csquestion_id}`}
        from="myAnswer"
      />

      {/* ─── 문제 본문 ───────────────────────── */}
      <h2 className="text-2xl py-36 border-b-1 border-gray-300 mb-36">
        {csquestion_content}
      </h2>

      {/* ─── 답변 ───────────────────────── */}
      <h3 className="text-lg mb-16">내 답변</h3>
      <div
        className="border-1 border-gray-300 rounded-lg p-12 mb-48 min-h-160"
        dangerouslySetInnerHTML={{ __html: csanswer_content }}
      ></div>

      {/* ─── AI 피드백 받기 ───────────────────────── */}
      <div className="mb-60">
        <h3 className="text-lg mb-16">AI 피드백</h3>
        {csanswer_feedback && csanswer_feedback !== "아직 피드백 없음" ? (
          <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-700 border-1 border-gray-300 rounded-lg p-12 mb-24">
            {parseBold(csanswer_feedback)}
          </div>
        ) : (
          <BigButton
            onClick={handleFeedback}
            fill
            disabled={feedbackLoading}
            text={feedbackLoading ? "요청 중..." : "AI 피드백 받기"}
          />
        )}
      </div>

      {/* ─── 수정 / 삭제 ───────────────────────── */}
      <div className="flex gap-8 justify-end mb-60">
        <BigButton onClick={handleEdit} text="수정" fill />
        <BigButton onClick={handleDelete} text="삭제" />
      </div>
    </section>
  );
}

// function Tab({ to, label, active = false }) {
//   return (
//     <Link
//       to={to}
//       className={`inline-block px-8 py-6 min-w-[80px] text-center text-lg font-medium ${
//         active
//           ? "text-blue-600 border-b-2 border-blue-600"
//           : "text-gray-500 hover:text-blue-600"
//       }`}
//     >
//       {label}
//     </Link>
//   );
// }
