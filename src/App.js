import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Success from "./pages/Success";
import Verification from "./pages/Verification";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const [ userAccess, setUserAccess ] = useState(false);
  
  useEffect(()=>{
  const userDetails = localStorage.getItem('userDetails');
  if(userDetails){
    setUserAccess(userDetails);
  }
  console.log("userDetailsINAPP: ", userDetails);
  }, [])
  return (
    <div className="checkout__dashboard__container__app">
    <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage setUserAccess={setUserAccess} />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/verify" element={<Verification />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
