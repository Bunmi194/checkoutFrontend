import React from "react";
import "./rightsidebar.css";
import Card from "./Card";
import FundWallet from "./FundWallet";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";

const RightSideBar = ({
  activityCounter,
  setActivityCounter,
  onRightToggle,
  setOnRightToggle,
}) => {
  const hideRightSideBar = () => {
    setOnRightToggle(false);
  };

  return (
    <div
      className={`checkout__rightsidebar__overall__container ${
        onRightToggle
          ? "checkout__rightsidebar__overall__container__show"
          : "checkout__rightsidebar__overall__container__hide"
      }`}
    >
      <label
        className="checkout__hide__rightsidebar"
        onClick={hideRightSideBar}
      >
        -&gt;
      </label>
      <Card />
      <FundWallet
        setActivityCounter={setActivityCounter}
        setOnRightToggle={setOnRightToggle}
      />
      <Transfer
        setActivityCounter={setActivityCounter}
        setOnRightToggle={setOnRightToggle}
      />
      <Withdraw
        setActivityCounter={setActivityCounter}
        setOnRightToggle={setOnRightToggle}
      />
      {/* <Chart /> */}
    </div>
  );
};

export default RightSideBar;
