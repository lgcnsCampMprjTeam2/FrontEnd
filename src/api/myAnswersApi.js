import axios from "axios";

/**
 * 특정 문제(questionId)에 대한 내 답변 목록을 페이징하여 가져옵니다.
 * @param {number} page      — 페이지 번호 (1부터)
 * @param {string} questionId — URL param으로 받은 questionId
 * @returns {Promise<{ content: any[], totalPages: number }>}
 */
export const fetchAnswers = async (page = 1, questionId) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await axios.get("/api/answer", {
    params: {
      page,
      size: 10,
      csquestion_id: questionId,
      sort: "csanswer_created_at,asc"
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return {
    content: res.data.result.content,
    totalPages: res.data.result.totalPages
  };
};