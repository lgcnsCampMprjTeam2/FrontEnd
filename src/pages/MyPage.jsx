import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/style.css';
import Tab from "../components/global/Tab";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");

    if (name && email && nickname) {
      setUserInfo({ name, email, nickname });
    } else {
      setUserInfo(null);
    }
  }, []);

  if (!userInfo) {
    return <p className="text-center mt-10">유저 정보를 찾을 수 없습니다. 로그인 후 이용해주세요.</p>;
  }

  return (
    <div className="bg-white px-120">
      <Tab title="마이페이지" titleTo='/user/info' from="myPage"/>

      <table className="mypage-table mx-auto border-collapse">
        <tbody>
          <tr>
            <td className="border px-4 py-2">이름</td>
            <td className="border px-4 py-2">{userInfo.name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">이메일</td>
            <td className="border px-4 py-2">{userInfo.email}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">닉네임</td>
            <td className="border px-4 py-2">{userInfo.nickname}</td>
          </tr>
        </tbody>
      </table>

      <div className="max-w-[600px] mx-auto mt-6 text-center">
        <Link to="/user/update"
          className="inline-block px-6 py-2 border border-black bg-white text-black font-medium rounded"
        > 정보 수정
        </Link>
      </div>

      <div className="max-w-[600px] mx-auto mt-6 text-center">
        <Link to="/user/delete"
          className="inline-block px-6 py-2 border border-black bg-white text-black font-medium rounded"
        > 회원 탈퇴
        </Link>
      </div>
    </div>
  );
}

export default MyPage;
