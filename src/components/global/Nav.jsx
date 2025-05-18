import React from "react";
import { Link } from "react-router-dom";
import BigButton from "./BigButton";

const Nav = () => {
  return (
    <div className="w-full h-92 border-b-1 border-gray-100 items-center px-40 grid-cols-3 grid">
      <ul className="flex">
        <li>
          <Link to="questions" className="px-20 text-lg font-semibold">
            CS 면접 질문
          </Link>
        </li>
        <li>
          <Link to="comm" className="px-20 text-lg font-semibold">
            질문 게시판
          </Link>
        </li>
      </ul>

      <Link className="flex justify-center" to="/">
        로고
      </Link>

      <div className="flex gap-20 justify-end">
        <BigButton text="회원가입" />
        <BigButton text="로그인" fill />
      </div>
    </div>
  );
};

export default Nav;
