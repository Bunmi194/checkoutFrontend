import React from 'react'
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import RightSideBar from "../components/RightSideBar";
import "./dashboard.css";

const dashboard = () => {
  return (
    <div className='checkout__dashboard__container'>
      <Sidebar />
      <Main />
      <RightSideBar />
    </div>
  )
}

export default dashboard