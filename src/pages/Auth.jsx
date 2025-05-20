import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function AuthPage() {

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'signin';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="max-w-500 margin-top 20px mt-100 mx-auto my-auto cmt-25 bg-white shadow-lg rounded-lg">
      {/* 탭 네비 */}
      <nav className="flex border-b">
        <button
          className={`flex-1 py-15 text-center font-semibold cursor-pointer ${
            activeTab === 'signin'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('signin')}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-15 text-center font-semibold cursor-pointer ${
            activeTab === 'signup'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </nav>

      <div className="p-50">
        {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

function SignInForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // 타입 표기를 제거했습니다.
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { usernameOrEmail, password });
      console.log('로그인 성공:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-20">
      <input
        type="text"
        placeholder="Username or email"
        value={usernameOrEmail}
        onChange={e => setUsernameOrEmail(e.target.value)}
        required
        className="w-full px-10 py-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full px-10 py-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="w-full py-8 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
      >
        Sign In
      </button>
    </form>
  );
}

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 여기도 타입 표기 없이 e만 사용합니다.
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const res = await axios.post('/user/signup', { email, password });
      console.log('회원가입 성공:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-20">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-10 py-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full px-10 py-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
        className="w-full px-10 py-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        className="w-full py-8 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
}
