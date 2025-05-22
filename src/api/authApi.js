import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const postLogout = async ({ accessToken }) => {
  try {
    const res = await axios.post(
      "/api/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profileImgUrl");
    localStorage.removeItem("nickname");
  } catch (e) {
    console.log(e);
  }
};
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (const cookie of cookieArr) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}
export const reissueToken = async () =>{
  const refreshToken = getCookie("refreshToken");
  try{
    const res = await axios.post(
      "/api/auth/reissue",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      }
    );

    localStorage.setItem("accessToken", res.data.result);

    return res;
  }catch(e){
    console.log(e);
  }
}