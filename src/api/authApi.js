import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const postLogout = async ({ accessToken }) => {
  console.log(accessToken);
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

    console.log(res.data);
    // setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profileImgUrl");
    localStorage.removeItem("nickname");

    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};
