import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import RightSideBar from "../components/RightSideBar";
import "./dashboard.css";
import { toast } from "react-toastify";

const BASEURL = process.env.REACT_APP_APIURL;
const verifyTransaction = async (ref, token) => {
  if (!ref) {
    toast.error("Transaction failed", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  const verify = await fetch(`${BASEURL}/v1/fund/verify/${ref}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const result = await verify.json();
  if (!result.status) {
    toast.error("Transaction failed", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => {
      window.open("/dashboard", "_self");
    }, 2000);
    return;
  }
  toast.success("Wallet funded successfully", {
    position: toast.POSITION.TOP_RIGHT,
  });
  setTimeout(() => {
    window.open("/dashboard", "_self");
  }, 3000);
  return;
};
const Dashboard = ({ setUserAccess }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [activityCounter, setActivityCounter] = useState(0);
  const [onSidebarToggle, setOnSidebarToggle] = useState(false);
  const [onRightToggle, setOnRightToggle] = useState(false);
  let token;

  useEffect(() => {
    const userDetails = JSON.parse(
      localStorage.getItem("userDetails__checkout__app")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = userDetails.token;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("trxref");
    if (ref) {
      verifyTransaction(ref, token);
    }
  }, []);

  return (
    <div className="checkout__dashboard__container">
      <Sidebar
        setUserAccess={setUserAccess}
        setDataLoaded={setDataLoaded}
        onSidebarToggle={onSidebarToggle}
        setOnSidebarToggle={setOnSidebarToggle}
        setOnRightToggle={setOnRightToggle}
      />
      <Main
        setDataLoaded={setDataLoaded}
        dataLoaded={dataLoaded}
        activityCounter={activityCounter}
        onSidebarToggle={onSidebarToggle}
        setOnSidebarToggle={setOnSidebarToggle}
        setOnRightToggle={setOnRightToggle}
        setUserAccess={setUserAccess}
      />
      <RightSideBar
        setActivityCounter={setActivityCounter}
        activityCounter={activityCounter}
        setOnRightToggle={setOnRightToggle}
        onRightToggle={onRightToggle}
      />
    </div>
  );
};

export default Dashboard;
