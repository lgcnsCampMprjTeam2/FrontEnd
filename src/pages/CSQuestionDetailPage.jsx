import React, { useState, useEffect } from "react";
import CSAnswerEditor from "../components/cs/CSAnswerEditor";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import BigButton from "../components/global/BigButton";
import { fetchQuestionById } from "../api/CSQuestionApi";
import Tab from "../components/global/Tab";

function AnswerTab({ to, label, active = false }) {
  return (
    <Link
      to={to}
      className={`inline-block px-8 py-12 min-w-[80px] text-center
                  ${
                    active
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
    >
      {label}
    </Link>
  );
}

const CSQuestionDetailPage = () => {
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState();
  const { questionId } = useParams();
  const navigate = useNavigate();

  const postAnswer = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken == null) {
      alert("로그인이 필요합니다.");
      navigate("/auth");
      return;
    }
    
    try {
      const res = await axios.post(
        "/api/answer",
        {
          csquestion_id: questionId,
          csanswer_content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      console.log("답변 등록 성공", res.data);
      navigate(`/answer`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchQuestionById(questionId).then((data) => setQuestion(data));
  }, []);

  return (
    <div className="px-120">
      {/* tab */}
      <Tab
        title={`${questionId}번`}
        titleTo={`/questions/detail/${questionId}`}
        from="question"
      />

      {/* 문제 */}
      {question && (
        <p className="text-2xl py-36 border-b-1 border-gray-300 mb-36">
          {question.content}
        </p>
      )}

      {/* 작성 */}
      <CSAnswerEditor content={content} setContent={setContent} />

      <div className="flex justify-end py-24">
        <BigButton text="제출" fill onClick={postAnswer} />
      </div>
    </div>
  );
};

export default CSQuestionDetailPage;
