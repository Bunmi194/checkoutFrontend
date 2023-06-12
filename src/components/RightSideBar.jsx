import React from 'react'
import "./rightsidebar.css";
import Card from "./Card";
import FundWallet from "./FundWallet";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";
import Chart from "./Chart";

const RightSideBar = ({ activityCounter, setActivityCounter }) => {
  return (
    <div className='checkout__rightsidebar__overall__container'>
      <Card />
      <FundWallet setActivityCounter={setActivityCounter} />
      <Transfer setActivityCounter={setActivityCounter} />
      <Withdraw setActivityCounter={setActivityCounter} />
      {/* <Chart /> */}
    </div>
  )
}

export default RightSideBar