import axios from "axios";

const AnswerResultapi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

AnswerResultapi.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

AnswerResultapi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

//특정 답변 조회
export function getAnswer(answerId) {
  return AnswerResultapi.get(`/answers/${answerId}`);
}

// AI 피드백 요청
export function requestFeedback(answerId, csanswer_id) {
  return AnswerResultapi.post(`/answers/${answerId}`, { csanswer_id });
}

// 답변 수정 요청
export const editAnswer = async (answerId, content) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(content);
  try {
    const res = await axios.post(
      `/api/answer/${answerId}/edit`,
      { csanswer_content: content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // navigate 필요
  } catch (e) {
    console.log(e);
  }
};

//답변 삭제 요청
export const deleteAnswer = async (answerId) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await axios.post(
      `/api/answer/${answerId}/delete`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // Navigate 필요
  } catch (e) {
    console.log(e);
  }
};

export default AnswerResultapi;
