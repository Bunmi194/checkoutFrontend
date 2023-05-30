import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <div className="checkout__dashboard__container__app">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
