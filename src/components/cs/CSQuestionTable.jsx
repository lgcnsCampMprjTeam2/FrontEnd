import React from "react";
import { Link } from "react-router-dom";

const CSQuestionTable = ({ questions }) => {
  if (!questions) {
    return null;
  }
  const thStyle = "font-medium py-10 text-black";

  return (
    <div className="h-600">
      <table className="w-full">
        <thead>
          <tr className="bg-secondary rounded-[5px] text-center">
            <th className={`${thStyle} rounded-l-[5px] w-90`}>번호</th>
            <th className={`${thStyle} text-start`}>문제</th>
            <th className={`${thStyle} w-130`}>날짜</th>
            <th className={`${thStyle} rounded-r-[5px] w-70`}>정보</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => {
            return (
              <tr
                key={q.id}
                className="h-48 text-center border-b-1 border-gray-300"
              >
                <td>{q.id}</td>
                <td className="text-start">
                  <Link to={`/questions/detail/${q.id}`}>{q.content}</Link>
                </td>
                <td>{q.createdAt.substring(0, 10)}</td>
                <td className="flex justify-center items-center h-48">
                  <p
                    className=" text-white w-48 h-28 flex justify-center items-center rounded-sm text-sm"
                    style={{
                      backgroundColor: `${q.submitted
                        ? "var(--color-primary)"
                        : "var(--color-gray-700)"
                        }`
                    }}
                  >
                    {q.submitted ? "제출" : "미제출"}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CSQuestionTable;
