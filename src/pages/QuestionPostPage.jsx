import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Category from '../components/global/Category';   
import '../App.css';

function QuestionPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('전체');
  const [problemNumber, setProblemNumber] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const postData = {
      title,
      category,
      problemNumber,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post('/api/questions', postData);
      alert('질문이 성공적으로 등록되었습니다.');
      // TODO: 페이지 이동 또는 폼 초기화
    } catch (err) {
      console.error(err);
      alert('질문 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <section className="mx-auto max-w-5xl pt-14 pb-24 px-6">
        {/* 입력 필드 */}
        <div className="grid grid-cols-[120px_1fr] gap-y-8 gap-x-8">
          {/* ── 제목 ─────────────────────────────── */}
          <label className="self-center text-base font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목"
            className="h-30 w-full text-lg px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* ── 카테고리 (공통 컴포넌트) ─────────── */}
          <label className="self-center text-base font-medium mr-2">카테고리</label>
          <Category
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          {/* ── 문제번호 ─────────────────────────── */}
          <label className="self-center text-base font-medium">문제번호</label>
          <input
            type="text"
            value={problemNumber}
            onChange={e => setProblemNumber(e.target.value)}
            placeholder="문제번호"
            className="h-30 w-150 text-lg px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* ── CKEditor ──────────────────────────── */}
        <div className="mt-10">
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => setContent(editor.getData())}
          />
        </div>

        {/* ── 제출 버튼 ─────────────────────────── */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="h-30 px-12 bg-blue-600 text-lg text-white rounded-md hover:bg-blue-700"
          >
            제출
          </button>
        </div>
      </section>
    </>
  );
}

export default QuestionPostPage;
