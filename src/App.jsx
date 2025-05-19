import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Nav from "./components/global/Nav";
import InfoUpdate from "./pages/InfoUpdate";
import QuestionBoard from './pages/QuestionBoard';
import QuestionDetail from './pages/QuestionDetail';
import QuestionPostPage from "./pages/QuestionPostPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/info" element={<MyPage />} />
          <Route path="/user/update" element={<InfoUpdate />} />
          <Route path="/comm" element={<QuestionBoard />} />
          <Route path="/comm/all" element={<QuestionDetail />} />
          <Route path="/comm/post" element={<QuestionPostPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
