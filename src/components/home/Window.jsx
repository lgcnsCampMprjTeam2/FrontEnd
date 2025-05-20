import React from "react";
import search from "../../assets/search.svg";

const Circle = ({ color }) => {
  return (
    <div
      className="rounded-full w-12 h-12"
      style={{ background: `var(--color-${color})` }}
    ></div>
  );
};

const Window = ({ todayQuestion }) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;


  return (
    <div className="w-640 h-360 bg-white rounded-lg shadow-[0px_0px_15px_0px_rgba(29,78,214,0.15)] mb-50">
      {/* header */}
      <div className="border-b-1 w-full h-42 border-gray-100 flex items-center px-24">
        {/* circles */}
        <div className="flex gap-6 items-center pr-117">
          <Circle color="primary" />
          <Circle color="secondary" />
          <Circle color="gray-100" />
        </div>

        {/* search */}
        <div className="w-270 py-4 bg-gray-100 rounded-[5px] flex justify-end px-12">
          <p className="text-center text-sm text-gray-700">{formattedDate}</p>
          <img src={search} alt="search" className="pl-60" />
        </div>
      </div>

      {/* content */}
      <div className='py-22 flex flex-col items-center px-48 gap-52'>
        <span className='text-base text-center font-semibold text-black border-b-1 border-black'>오늘의 CS 질문</span>
        <p className='text-center text-5xl font-semibold text-primary text-shadow-[2px_2px_10px_rgb(0_0_0_/_0.15)] leading-60'>{todayQuestion}</p>
      </div>
    </div>
  );
};

export default Window;
