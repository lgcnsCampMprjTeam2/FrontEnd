import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getQuestionDetail,
  getComments,
  postComment,
  updateQuestion,
  deleteQuestion,
} from '../api/QuestionDetailApi';
import '../styles/style.css';

const QuestionDetail = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [questionInfo, setQuestionInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState(''); // 제목 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetail(number);
        const commentList = await getComments(number);
        const sortedComments = commentList.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setQuestionInfo(question);
        setEditedContent(question.content);
        setEditedTitle(question.title); // 제목 초기값 세팅
        setComments(sortedComments);
      } catch (error) {
        console.error(error);
        setQuestionInfo(null);
        setComments([]);
      }
    };

    if (number) {
      fetchData();
    }
  }, [number]);

  const handleCommentSubmit = async () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    const newComment = {
      content: trimmed,
      username: '익명',
    };

    try {
      await postComment(number, newComment);

      const commentList = await getComments(number);
      const sortedComments = commentList
        .sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      setComments(sortedComments);
      setInput('');
    } catch (error) {
      console.error(error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      updateQuestion(number, {
        title: editedTitle,
        question_id: questionInfo.question_id,
        content: editedContent,
        category: questionInfo.category,
      })
        .then(() => {
          setQuestionInfo({
            ...questionInfo,
            content: editedContent,
            title: editedTitle,
          });
          setIsEditing(false);
          alert('질문이 수정되었습니다.');
        })
        .catch((err) => {
          console.error(err);
          alert('수정에 실패했습니다.');
        });
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteQuestion(number)
        .then(() => {
          alert('질문이 삭제되었습니다.');
          navigate('/');
        })
        .catch((err) => {
          console.error(err);
          alert('삭제에 실패했습니다.');
        });
    }
  };

  return (
    <div className="bg-white p-6">
      {!questionInfo ? (
        <p className="text-center text-gray-500">질문 정보를 불러올 수 없습니다.</p>
      ) : (
        <>
          {/* 질문 정보 테이블 */}
          <table className="question-table border w-full text-sm mb-6">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold">제목</td>
                <td colSpan="3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    questionInfo.title
                  )}
                </td>
                <td className="font-semibold">작성자</td>
                <td>{questionInfo.username}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold">주제</td>
                <td>{questionInfo.category}</td>
                <td className="font-semibold">문제 번호</td>
                <td>{questionInfo.question_id}</td>
                <td className="font-semibold">작성일</td>
                <td>{new Date(questionInfo.created_at).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>

          {/* 질문 내용 */}
          <div className="content-box border p-4 mb-6 whitespace-pre-line">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-40 p-2 border rounded"
              />
            ) : (
              questionInfo.content
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="actions flex gap-4 mb-6">
            <button
              onClick={handleEdit}
              className="text-gray-700 hover:text-blue-600"
            >
              {isEditing ? '저장' : '수정'}
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-700 hover:text-red-600"
            >
              삭제
            </button>
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
          className="border p-2 w-full rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-primary text-white rounded-r-md px-4"
        >작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <table className="comment-table w-full text-sm border-t" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '70%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">내용</th>
            <th className="p-2">작성자</th>
            <th className="p-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.comment_id} className="border-t">
              <td className="p-2">{comment.content}</td>
              <td className="p-2">{comment.username}</td>
              <td className="p-2">{new Date(comment.created_at).toLocaleString().slice(0, 12)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionDetail;
