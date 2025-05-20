import React from "react";

const CSQuestionTable = ({ questions }) => {
  if (!questions) {
    return null;
  }
  const thStyle = "font-medium py-10";
  return (
    <div>
      <table className="w-full">
        <tr className="bg-secondary rounded-[5px] text-center">
          <th className={`${thStyle} rounded-l-[5px] w-90`}>번호</th>
          <th className={`${thStyle} text-start`}>문제</th>
          <th className={thStyle}>날짜</th>
          <th className={`${thStyle} rounded-r-[5px]`}>정보</th>
        </tr>
        {questions.map((q) => {
          return (
            <tr
              key={q.id}
              className="h-48 text-center border-b-1 border-gray-300"
            >
              <td>{q.id}</td>
              <td className="text-start">{q.content}</td>
              <td>{q.createdAt.substring(0, 10)}</td>
              <td className="flex justify-center items-center h-48">
                <p className="bg-gray-700 text-white w-48 h-28 flex justify-center items-center rounded-sm text-sm">
                  {q.submitted ? "제출" : "미제출"}
                </p>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default CSQuestionTable;
