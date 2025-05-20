import React from 'react';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/user/delete', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/');
      } else {
        alert('회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error('탈퇴 중 오류:', error);
      alert('서버 오류가 발생했습니다.');
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
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full mr-2 transition"
          >
            탈퇴하기
          </button>
          <button
            onClick={() => navigate('../user/info')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl w-full ml-2 transition"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
