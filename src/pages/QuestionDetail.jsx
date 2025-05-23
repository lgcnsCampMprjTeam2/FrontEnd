import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  getQuestionDetail,
  getComments,
  postComment,
  updateQuestion,
  deleteQuestion,
  editComment,
  deleteComment,
  toggleLikeComment
} from '../api/QuestionDetailApi';
import '../styles/style.css';
import BigButton from '../components/global/BigButton';

const QuestionDetail = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [questionInfo, setQuestionInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState(''); // 제목 상태 추가
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

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
      const sortedComments = commentList.sort(
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
          navigate('/comm');
        })
        .catch((err) => {
          console.error(err);
          alert('삭제에 실패했습니다.');
        });
    }
  };

  // --- 댓글 수정, 삭제, 좋아요 버튼 핸들러 ---
  const handleCommentEditSubmit = async (commentId) => {
    if (editedCommentContent.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await editComment(commentId, editedCommentContent);
      const updatedComments = await getComments(number);
      setComments(updatedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      setEditingCommentId(null);
      setEditedCommentContent('');
    } catch (error) {
      console.error(error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment(commentId);
      const updatedComments = await getComments(number);
      setComments(updatedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error(error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const result = await toggleLikeComment(commentId);
      const updatedComments = await getComments(number);
      setComments(updatedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error(error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <div className="bg-white p-6">
      {!questionInfo ? (
        <p className="text-center text-gray-500">
          질문 정보를 불러올 수 없습니다.
        </p>
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
                <td>
                  {new Date(questionInfo.created_at).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* 질문 내용 */}

          <div className="content-box p-12 border-gray-300 border-1 rounded-xl min-h-200">
            {isEditing ? (
              <CKEditor
                editor={ClassicEditor}
                data={editedContent}
                onReady={(editor) => {
                  const editable = editor.ui.view.editable.element;
                  editable.style.minHeight = '100px';
                  editable.style.maxHeight = '100px';
                  editable.style.padding = '1rem';
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditedContent(data);
                }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: questionInfo.content }} />
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-end gap-8 mr-52">
            <BigButton
              text={isEditing ? "저장" : "수정"}
              onClick={handleEdit}
              fill
            />
            <BigButton text="삭제" onClick={handleDelete} />
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
        >
          작성
        </button>
      </div>

      {/* 댓글 목록 */}
      <table
        className="comment-table w-full text-sm border-t border-collapse"
        style={{ tableLayout: "fixed" }}
      >
        <colgroup>
          <col style={{ width: "55%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">내용</th>
            <th className="p-2">작성자</th>
            <th className="p-2">작성일</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.comment_id} className="border-t">
              <td className="p-2">
                {editingCommentId === comment.comment_id ? (
                  <textarea
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  comment.content
                )}
              </td>
              <td className="p-2 text-center">{comment.username}</td>
              <td className="p-2 text-center">
                {new Date(comment.created_at).toLocaleString().slice(0, 12)}
              </td>
              <td className="p-2 text-center">
                <div className="space-x-6">
                  {editingCommentId === comment.comment_id ? (
                    <>
                      <button
                        className="bg-green-700 text-white px-4 py-1 rounded cursor-pointer"
                        onClick={() => handleCommentEditSubmit(comment.comment_id)}
                      >
                        저장
                      </button>
                      <button
                        className="border border-gray-400 px-4 py-1 rounded cursor-pointer"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditedCommentContent('');
                        }}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-700 text-white px-6 py-1 rounded cursor-pointer"
                        onClick={() => {
                          setEditingCommentId(comment.comment_id);
                          setEditedCommentContent(comment.content);
                        }}
                      >수정
                      </button>
                      <button
                        className="border border-blue-700 px-6 py-1 rounded cursor-pointer text-blue-700"
                        onClick={() => handleCommentDelete(comment.comment_id)}
                      >삭제
                      </button>
                      <button
                        className="text-red-700 px-2 py-1 rounded cursor-pointer"
                        onClick={() => handleCommentLike(comment.comment_id)}
                      >♥
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionDetail;
