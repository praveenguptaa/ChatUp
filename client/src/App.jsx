import React,{lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Register = lazy(()=> import('./pages/Register'));
const Login = lazy(()=> import('./pages/Login'));
const Chat = lazy(()=> import('./pages/Chat'));
const SetAvatar = lazy(()=> import('./components/SetAvatar'));
const SetUsername = lazy(()=> import ('./pages/SetUsername'));



function App() {


  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<></>}>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/setAvatar" element={<SetAvatar/>} />
        <Route path="/setUsername" element={<SetUsername/>}/>
        <Route path="/" element={<Chat/>} />
      </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
