import React from "react";
import '../styles/style.css';

function MyPage() {
  return (
    <div className="bg-white min-h-screen">
      <nav className="flex space-x-8 mt-4 mb-8 px-20">
        <div className="text-blue-600 font-semibold relative py-2">
          마이페이지
          <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-600 rounded"></span>
        </div>
        <a
          href="/내-답변-페이지"
          className="text-gray-600 hover:text-blue-600 font-medium py-2"
        >
          내 답변
        </a>
      </nav>

      <table className="mypage-table mx-auto border-collapse">
        <tbody>
          <tr>
            <td className="border px-4 py-2">이름</td>
            <td className="border px-4 py-2">이름</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">생년월일</td>
            <td className="border px-4 py-2">2005-05-18</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">이메일</td>
            <td className="border px-4 py-2">email@google.com</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">닉네임</td>
            <td className="border px-4 py-2">MiniProject</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">내 답변 수</td>
            <td className="border px-4 py-2">1092</td>
          </tr>
        </tbody>
      </table>

      <div className="max-w-[600px] mx-auto mt-6 text-center">
        <a href="./update"  // href 주소 변경
          className="inline-block px-6 py-2 border border-black bg-white text-black font-medium rounded"
        > 정보 수정
        </a>
      </div>

      <div className="max-w-[600px] mx-auto mt-6 text-center">
        <a href="/회원탈퇴"
          className="inline-block px-6 py-2 border border-black bg-white text-black font-medium rounded"
        > 회원 탈퇴
        </a>
      </div>
    </div>
  );
}

export default MyPage;
