import React from "react";
import { Link } from "react-router-dom";
import BigButton from "./BigButton";
import logo from "./logo.png";
import axios from "axios";

const Nav = () => {
  const accessToken = localStorage.getItem("accessToken");
  const profileImgUrl = localStorage.getItem("profileImgUrl");
  const handleLogout = async () => {
    try{
      const res = await axios.get("/api/user/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}}`,
        },
      });

      console.log(res.data);
    }catch(e){
      console.log(e);
    }
  };

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
        <img src={logo} />
      </Link>

      <div className="flex gap-20 justify-end">
        {accessToken ? (
          <>
            <BigButton text="로그아웃" onClick={handleLogout} />

              {profileImgUrl ?
              <img src={profileImgUrl} alt="" />:
              <button className="w-44 h-44 bg-gray-300 rounded-full"></button>
            }

          </>
        ) : (
          <>
            <Link to="/auth?tab=signup">
              <BigButton text="회원가입" />
            </Link>
            <Link to="/auth?tab=signin">
              <BigButton text="로그인" fill />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
