import axios from "axios";


export async function postQuestion({
  title,
  category,
  question_id,
  content
}) {

  const res = await axios.post
    ("/api/comm", {
      title, 
      category,
      question_id,
      content,
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  return res.data;
}