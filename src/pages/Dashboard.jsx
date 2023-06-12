import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import RightSideBar from "../components/RightSideBar";
import "./dashboard.css";
import { toast } from "react-toastify";
import { css } from '@emotion/react';
import { ClipLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const verifyTransaction = async (ref, token) => {
  if(!ref) {
    toast.error("Transaction failed", {
      position: toast.POSITION.TOP_RIGHT
    });
    return;
  }
  const verify = await fetch(`http://localhost:4000/v1/fund/verify/${ref}`, {
    method: 'GET',
    headers: { 
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
  const result = await verify.json();
  console.log("result: ", result);
  if(!result.status){
    toast.error("Transaction failed", {
      position: toast.POSITION.TOP_RIGHT
    });
    setTimeout(()=>{
      window.open("/dashboard", "_self");
    }, 2000);
    return;
  }
  toast.success("Wallet funded successfully", {
    position: toast.POSITION.TOP_RIGHT
  });
  setTimeout(()=>{
    window.open("/dashboard", "_self");
  }, 3000);
  return;
}
const Dashboard = ({setUserAccess}) => {
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const [ activityCounter, setActivityCounter ] = useState(0);
  const { paramsId } = useParams();
  // console.log("ref: ", ref);
  console.log("params: ", paramsId);
  let token;
  
  useEffect(()=> {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    token = userDetails.token;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('trxref');
    
    console.log("paramsID: ", paramsId);
    console.log("THISIStoken: ", token);
    console.log("THISISREF: ", ref);
    if(ref){
      console.log("THISISREF: ", ref);
      verifyTransaction(ref, token)
    }
  }, []);

  return (
    <div className='checkout__dashboard__container'>
          <Sidebar setUserAccess={setUserAccess} setDataLoaded={setDataLoaded} />
          <Main setDataLoaded={setDataLoaded} dataLoaded={dataLoaded} activityCounter={activityCounter} />
          <RightSideBar setActivityCounter={setActivityCounter} activityCounter={activityCounter} />
    </div>
  )
}

export default Dashboard;