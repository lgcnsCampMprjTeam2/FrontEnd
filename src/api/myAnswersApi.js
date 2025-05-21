import axios from "axios";


export const fetchAnswers = async (page = 1, questionId) => {
  const res = await axios.get("/api/answers", {
    params: {
      page,
      size: 10,    
      csquestion_id: questionId,
      sort: "csanswer_created_at,asc"
    },
  });


  return res.data.result;
};