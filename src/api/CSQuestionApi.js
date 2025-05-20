import axios from "axios";
export const fetchQuestions = async (page = 1, category = "") => {
  const res = await axios.get("/api/questions", {
    params: {
      page: page,
      category: category || undefined,
    },
  });

  return res.data.result;
};

export const fetchTodayQuestion = async () => {
  const res = await axios.get("/api/questions/today");
  return res.data.result;
};

export const fetchQuestionById = async (questionId) => {
  const res = await axios.get(`/api/questions/${questionId}`);

  return res.data.result;
};
