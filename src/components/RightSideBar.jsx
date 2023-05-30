import React from 'react'
import "./rightsidebar.css";
import Card from "./Card";
import FundWallet from "./FundWallet";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";
import Chart from "./Chart";

const RightSideBar = () => {
  return (
    <div className='checkout__rightsidebar__overall__container'>
      <Card />
      <FundWallet />
      <Transfer />
      <Withdraw />
      {/* <Chart /> */}
    </div>
  )
}

export default RightSideBar