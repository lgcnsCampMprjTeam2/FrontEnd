import React from "react";
import { Link, useLocation } from "react-router-dom";

function AnswerTab({ to, label, active = false, state }) {
  return (
    <Link
      to={to}
      state={state}
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

const Tab = ({ title, titleTo, from }) => {
  const location = useLocation();

  let leftLabel = "";
  let leftTo = "";
  let stateForMyAnswers = {};

  if (from === "question") {
    leftLabel = title;
    leftTo = titleTo;
    stateForMyAnswers = {
      from: "question",
      title,
      titleTo,
      questionId: title.replace("번", ""),
    };
  } else if (from === "myPage") {
    leftLabel = "마이페이지";
    leftTo = "/user/info";
    stateForMyAnswers = {
      from: "myPage",
    };
  }
  return (
    <nav className="mt-24">
      <AnswerTab
        to={leftTo}
        label={leftLabel}
        active={location.pathname === leftTo}
      />

      <AnswerTab
        to="/myAnswers"
        label="내 답변"
        state={stateForMyAnswers}
        active={location.pathname === "/myAnswers"}
      />
    </nav>
  );
};

export default Tab;
