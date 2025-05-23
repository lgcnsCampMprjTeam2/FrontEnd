import axios from 'axios';

// 질문 상세 정보 가져오기
export const getQuestionDetail = async (postId) => {
  const res = await axios.get(`/api/comm/${postId}`);
  return res.data.result;
};

// 질문 수정
export const updateQuestion = async (postId, data) => {    
  const res = await axios.patch(`/api/comm/${postId}`, data, {
   headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
  });
      console.log(data,localStorage.getItem("accessToken"));
  return res.data.result;
};

// 질문 삭제
export const deleteQuestion = async (postId) => {
  const res = await axios.delete(`/api/comm/${postId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
  });
  return res.data.result;
};

// 댓글 목록 가져오기
export const getComments = async (postId) => {
  const res = await axios.get(`/api/comm/${postId}/comments`);
  console.log('getComments response:', res.data);
  return res.data.result?.comments || [];
};

// 댓글 작성
export const postComment = async (postId, comment) => {
  const res = await axios.post(`/api/comm/${postId}/comments`, comment, {
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
});
  return res.data.result;
};

// 댓글 수정
export const editComment = async (commentId, content) => {
  const res = await axios.patch(`/api/comm/comments/${commentId}`,{ content },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data.result; // 수정된 댓글 정보
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const res = await axios.delete(`/api/comm/${postId}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data.result;
};

// 댓글 좋아요 토글
export const toggleLikeComment = async (commentId) => {
  const res = await axios.post(`/api/comm/${postId}/${commentId}/like`,{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data.result;
};