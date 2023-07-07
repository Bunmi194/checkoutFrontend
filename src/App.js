import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Success from "./pages/Success";
import Verification from "./pages/Verification";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const [userAccess, setUserAccess] = useState(false);

  const userDetails = localStorage.getItem("userDetails__checkout__app");
  useEffect(() => {
    if (userDetails) {
      setUserAccess(userDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="checkout__dashboard__container__app">
      <ToastContainer />
      <Routes>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/verify" element={<Verification />}></Route>
        <Route
          path="/"
          element={
            !userAccess ? (
              <LoginPage setUserAccess={setUserAccess} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        ></Route>
        <Route
          path="/register"
          element={!userAccess ? <SignupPage /> : <Navigate to="/dashboard" />}
        ></Route>
        <Route
          path="/dashboard"
          element={
            !userAccess && !userDetails ? (
              <Navigate to="/" />
            ) : (
              <Dashboard setUserAccess={setUserAccess} />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
