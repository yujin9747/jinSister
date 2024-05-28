import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";

const App: React.FC = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<MainPage />}></Route>
              <Route path='/result' element={<ResultPage />}></Route>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
