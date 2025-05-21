import React, { useState, useEffect } from "react";
import '../styles/style.css';
import BigButton from "../components/global/BigButton";
import { useNavigate } from "react-router-dom";

function InfoUpdate() {
  const navigate = useNavigate();

  // userInfo 상태 생성 (초기값은 빈 객체)
  const [userInfo, setUserInfo] = useState({});

  // 컴포넌트 마운트 시 public/UserInfoData.json 파일 fetch
  useEffect(() => {
    fetch('/UserInfoData.json')
      .then(res => res.json())
      .then(data => setUserInfo(data))
      .catch(err => console.error('유저 정보 로드 실패:', err));
  }, []);

  // 수정 완료 버튼 클릭 시 유저정보 post 후 유저 정보 페이지로 이동동
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    birthDate: e.target.birth.value,
    email: e.target.email.value,
    nickname: e.target.nickname.value,
  };

  try {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('업데이트 실패');
    }

    const result = await response.json();
    alert(result.message);

    navigate("/user/info");

  } catch (error) {
    alert('회원 정보 수정에 실패했습니다.');
  }
};


  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
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
          defaultValue={userInfo.name || ""}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
        />

        <label className="w-full block mb-2 font-semibold" htmlFor="email">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={userInfo.email || ""}
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
          defaultValue={userInfo.nickname || ""}
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
