import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import QuestionPage from "./pages/QuestionPage";

const App: React.FC = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<MainPage />}></Route>
              <Route path='/question' element={<QuestionPage />}></Route>
              <Route path='/result' element={<ResultPage />}></Route>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
