import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/style.css';

const QuestionDetail = () => {
  const { number } = useParams();
  const [questionInfo, setQuestionInfo] = useState(null);

  const [comments, setComments] = useState([
    // 임시 댓글 리스트
    { text: '좋은 하루 보내세요 :)', author: 'User3' },
    { text: '이 기능 정말 유용하네요.', author: 'User2' },
    { text: '안녕하세요! 첫 번째 댓글입니다.', author: 'User1' }
  ]);
  const [input, setInput] = useState('');

  // 질문 정보 불러오기
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('/QDetailData.json');
        if (!response.ok) {
          throw new Error('질문 정보를 불러올 수 없습니다.');
        }
        const data = await response.json();
        setQuestionInfo(data);
      } catch (error) {
        console.error(error);
        setQuestionInfo(null);
      }
    };
    if (number) {
      fetchQuestion();
    } else {
      setQuestionInfo(null);
    }
  }, [number]);

  // 댓글 리스트 API에서 불러오기
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(`/api/comm/${number}/comments`);
  //       if (!response.ok) {
  //         throw new Error('댓글 정보를 불러올 수 없습니다.');
  //       }
  //       const data = await response.json();
  //       setComments(data);
  //     } catch (error) {
  //       console.error(error);
  //       setComments([]);
  //     }
  //   };
  //   if (number) {
  //     fetchComments();
  //   }
  // }, [number]);

  // 댓글 작성 핸들러
  const handleCommentSubmit = async () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    const newComment = {
      text: trimmed,
      author: '익명',
    };

    // 임시 댓글 작성
    setComments([newComment, ...comments]);
    setInput('');

    // try {
    //   const response = await fetch(`/api/comm/${number}/comments`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newComment),
    //   });
    //   if (!response.ok) {
    //     throw new Error('댓글 작성에 실패했습니다.');
    //   }
    //   const savedComment = await response.json();

    //   // 새 댓글을 맨 앞에 추가
    //   setComments([savedComment, ...comments]);
    //   setInput('');
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  // Enter 키 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {!questionInfo ? (
        <p className="text-center text-gray-500">질문 정보를 불러올 수 없습니다.</p>
      ) : (
        <>
          {/* 질문 정보 테이블 */}
          <table className="question-table border w-full text-sm mb-6">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-semibold">제목</td>
                <td className="p-2" colSpan="3">{questionInfo[number].title}</td>
                <td className="p-2 font-semibold">작성자</td>
                <td className="p-2">{questionInfo[number].author}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-semibold">주제</td>
                <td className="p-2">{questionInfo[number].subject}</td>
                <td className="p-2 font-semibold">문제 번호</td>
                <td className="p-2">{questionInfo[number].problemNumber}</td>
                <td className="p-2 font-semibold">작성일</td>
                <td className="p-2">{questionInfo[number].date}</td>
              </tr>
            </tbody>
          </table>

          {/* 질문 내용 */}
          <div className="content-box border p-4 mb-6">
            {questionInfo[number].content}
          </div>

          {/* 액션 버튼 */}
          <div className="actions flex gap-4 mb-6">
            <button className="text-gray-700 hover:text-red-300">🤍 공감</button>
            <button className="text-gray-700 hover:text-blue-600">수정</button>
            <button className="text-gray-700 hover:text-red-600">삭제</button>
          </div>
        </>
      )}

      {/* 댓글 입력 */}
      <div className="comment-input flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력하세요"
          className="border p-2 w-full rounded-l-md"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-600 text-white px-4 py-1 rounded-r-md hover:bg-blue-700"
        >작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <table className="comment-table w-full text-sm border-t">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">내용</th>
            <th className="p-2 text-left">작성자</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{comment.text}</td>
              <td className="p-2">{comment.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionDetail;
