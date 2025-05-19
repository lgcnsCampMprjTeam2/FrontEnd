import React from "react";
import Nav from "../components/global/Nav";
import BigButton from "../components/global/BigButton";
import { Link } from "react-router-dom";
import Window from "../components/home/Window";

const Home = () => {
  return (
    <div className="flex flex-col justify-center">
      {/* gradient */}
      <div className="w-full py-50 bg-linear-to-b from-white to-secondary flex flex-col justify-center items-center">
        <Window />

        <div className="flex justify-center">
          <Link className="items-center px-50 py-16 text-lg rounded-[10px] text-white bg-primary" to="answers/post">
            답변 작성하기
          </Link>
        </div>
      </div>

      <p className="text-gray-500 text-center py-24">
        매일 새로운 문제가 생성됩니다.
      </p>

      {/* CS 면접 질문 리스트 */}
      <div></div>
    </div>
  );
};

export default Home;
