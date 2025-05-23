import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";
import Tab from "../components/global/Tab";
import BigButton from "../components/global/BigButton";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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
    return (
      <p className="text-center mt-10">
        유저 정보를 찾을 수 없습니다. 로그인 후 이용해주세요.
      </p>
    );
  }


  return (
    <div className="bg-white px-120">
      <Tab title="마이페이지" titleTo="/user/info" from="myPage" />

      <table className="mypage-table w-full border-collapse">
        <tbody>
          <tr>
            <td className="border">이름</td>
            <td className="border">{userInfo.name}</td>
          </tr>
          <tr>
            <td className="border">이메일</td>
            <td className="border">{userInfo.email}</td>
          </tr>
          <tr>
            <td className="border">닉네임</td>
            <td className="border">{userInfo.nickname}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-12 justify-center">
        <BigButton
          text="정보 수정"
          fill
          onClick={() => navigate("/user/update")}
        />
        <BigButton
          text="회원 탈퇴"
          onClick={() => navigate("/user/update")}
        />
      </div>
      {/* <div className="max-w-[600px] mx-auto mt-6 text-center">
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
      </div> */}
    </div>
  );
}

export default MyPage;
