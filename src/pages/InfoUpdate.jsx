import React from "react";
import '../styles/style.css';
import BigButton from "../components/global/BigButton";

function InfoUpdate() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <form
        action="#" //action="api/user-info-update" 
        method="POST"
        className="w-full max-w-md bg-gray-100 py-50 px-20 rounded shadow flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">회원 정보 수정</h2>

        <label className="w-full block mb-2 font-semibold" htmlFor="name">
          이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue="이름"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
        />

        <label className="w-full block mb-2 font-semibold" htmlFor="birth">
          생년월일
        </label>
        <input
          type="text"
          id="birth"
          name="birth"
          defaultValue="2005-05-18"
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
        />

        <label className="w-full block mb-2 font-semibold" htmlFor="email">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue="email@google.com"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
        />

        <label className="w-full block mb-2 font-semibold" htmlFor="nickname">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          defaultValue="MiniProject"
          required
          className="w-full p-2 mb-6 border border-gray-300 rounded bg-white"
        />

        <div className="text-center mt-40">
        <BigButton text="수정완료" fill />
        </div>
      </form>
    </div>
  );
}

export default InfoUpdate;
