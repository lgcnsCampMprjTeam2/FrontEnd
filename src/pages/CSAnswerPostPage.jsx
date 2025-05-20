import React, { useState, useEffect } from "react";
import CSAnswerEditor from "../components/cs/CSAnswerEditor";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import BigButton from "../components/global/BigButton";

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

const CSAnswerPostPage = () => {
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState();
  const { questionId } = useParams();
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`/api/questions/${questionId}`);

      setQuestion(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const postAnswer = async () => {
    const token = localStorage.getItem("accessToken");
    if (token == null) {
      navigate("/");
      return;
    }
    try {
      const res = await axios.post(
        "/api/answers",
        {
          csquestion_id: questionId,
          csanswer_content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    fetchQuestion();
  }, []);

  return (
    <div className="px-120">
      {/* tab */}
      <nav className="mt-24">
        <AnswerTab
          to={`/answers/post/${questionId}`}
          label={`${questionId}번`}
          active
        />
        <AnswerTab to="#" label="내 답변" />
      </nav>

      {/* 문제 */}
      {question && <p className="text-2xl py-36">{question.content}</p>}

      {/* 작성 */}
      <CSAnswerEditor content={content} setContent={setContent} />

      <div className="flex justify-end py-24">
        <BigButton text="제출" fill onClick={postAnswer} />
      </div>
    </div>
  );
};

export default CSAnswerPostPage;
