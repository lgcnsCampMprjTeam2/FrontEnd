import React, { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Category from '../components/global/Category';   
import '../App.css';
import BigButton from '../components/global/BigButton';

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

  const inputStyle = "p-8 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none";

  return (
    <>
      <section className="mx-auto max-w-5xl py-24">
        {/* 입력 필드 */}
        <div className="grid grid-cols-[120px_1fr] gap-y-8 gap-x-8 mb-36">
          {/* ── 제목 ─────────────────────────────── */}
          <label className="self-center text-base font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className={inputStyle}
          />

          {/* ── 카테고리 (공통 컴포넌트) ─────────── */}
          <label className="self-center text-base font-medium mr-2">
            카테고리
          </label>
          <Category
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* ── 문제번호 ─────────────────────────── */}
          <label className="self-center text-base font-medium">문제번호</label>
          <input
            type="text"
            value={problemNumber}
            onChange={(e) => setProblemNumber(e.target.value)}
            placeholder="문제번호"
            className={inputStyle}
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
          <BigButton text="제출" fill onClick={handleSubmit}/>
        </div>
      </section>
    </>
  );
}

export default QuestionPostPage;
