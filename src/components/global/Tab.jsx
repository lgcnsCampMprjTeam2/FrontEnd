import React from "react";
import { Link } from "react-router-dom";

function AnswerTab({ to, label, active = false }) {
  return (
    <Link
      to={to}
      className={`inline-block px-8 py-4 min-w-[80px] text-center text-lg font-medium
        ${
          active
            ? "text-primary border-b-2 border-primary"
            : "text-gray-500 hover:text-primary"
        }`}
    >
      {label}
    </Link>
  );
}

const Tab = ({ questionId }) => {
  return (
    <nav className="mt-24">
      <AnswerTab
        to={`/questions/detail/${questionId}`}
        label={`${questionId}번`}
        active
      />
      <AnswerTab
        to="/myAnswers"
        label="내 답변"
        active={location.pathname === "/myAnswers"}
      />
    </nav>
  );
};

export default Tab;
