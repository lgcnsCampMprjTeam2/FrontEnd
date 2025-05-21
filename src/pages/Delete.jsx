import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BigButton from '../components/global/BigButton';

const Delete = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.post('/api/user/delete',{},{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })

      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImgUrl");
      localStorage.removeItem("nickname");
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/');
      window.location.reload();
      console.log(res);
      
    } catch (e) {
      alert('회원 탈퇴에 실패했습니다.');
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-70 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-70">
          회원 탈퇴
        </h2>
        <p className="text-gray-700 text-center mb-70">
          정말로 탈퇴하시겠습니까?<br />
          탈퇴 시 모든 정보가 삭제됩니다.
        </p>
        <div className="flex gap-12 justify-center">
          <BigButton text="탈퇴하기" onClick={handleDelete} fill width="140px"/>
          <BigButton text="취소" onClick={() => navigate('/user/info')} width="140px"/>
        
        </div>
      </div>
    </div>
  );
};

export default Delete;
