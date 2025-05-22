import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Category from '../components/global/Category';
import '../App.css';
import { postQuestion } from "../api/QuestionPostApi";
import BigButton from '../components/global/BigButton';

function QuestionPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('전체');
  const [question_id, setQuestionID] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);


    const postData = {
      title,
      category,
      question_id, 
      content,
    };

    try {
      const response = await postQuestion(postData);
      console.log("API 응답 전체:", response);
      const newId = response.result?.id;

      if (!newId) {
        throw new Error("API 응답에 새 질문 ID가 없습니다.");
      }

      alert("질문이 성공적으로 등록되었습니다.");
      navigate(`/comm/${question_id}`);
    } catch (err) {
      if (err.response?.data) {
        console.error("서버 응답 바디:", err.response.data);
        alert(`등록 실패:\n${JSON.stringify(err.response.data, null, 2)}`);
      } else {
        console.error("클라이언트 에러:", err);
        alert("질문 등록 중 에러가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = title.trim() && content.trim() && question_id;

  return (
    <section className="mx-auto max-w-5xl pt-14 pb-24 px-6">
      <div className="grid grid-cols-[120px_1fr] gap-y-8 gap-x-8">
        {/* 제목 */}
        <label className="self-center text-base font-medium">제목</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목"
          className="h-35 w-full text-lg px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* 카테고리 */}
        <label className="self-center text-base font-medium">카테고리</label>
        <Category value={category} onChange={e => setCategory(e.target.value)} />

        {/* 문제번호 */}
        <label className="self-center text-base font-medium">문제번호</label>
        <input
          type="text"
          value={question_id}
          onChange={e => setQuestionID(e.target.value)}
          placeholder="문제번호"
          className="h-35 w-150 text-lg px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* 에디터 */}
      <div className="mt-10">
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => setContent(editor.getData())}
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end mt-8">
        <button
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
          className={`
            ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}
            h-30 px-12 bg-blue-600 text-lg text-white rounded-md hover:bg-blue-700
          `}
        >
          {isSubmitting ? '등록 중...' : '제출'}
        </button>
      </div>
    </section>
  );
}

export default QuestionPostPage;
