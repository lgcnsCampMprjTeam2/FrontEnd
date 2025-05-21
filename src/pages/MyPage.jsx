import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/style.css';

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/UserInfoData.json');
        if (!response.ok) {
          throw new Error('유저 정보를 불러올 수 없습니다.');
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserInfo();
  }, []);

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }
  if (!userInfo) {
    return <p className="text-center mt-10">유저 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="bg-white min-h-screen">
      <nav className="flex space-x-8 mt-4 mb-8 px-20">
        <div className="text-blue-600 font-semibold relative py-2">
          마이페이지
          <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-600 rounded"></span>
        </div>
        <Link to="/myAnswers" className="text-gray-600 hover:text-blue-600 font-medium py-2">
          내 답변
        </Link>
      </nav>

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
