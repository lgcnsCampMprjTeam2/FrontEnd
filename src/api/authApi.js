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
