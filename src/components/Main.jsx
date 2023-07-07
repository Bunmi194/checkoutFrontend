import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./main.css";
import Header from "./Header";
import Statistics from "./Statistics";
import Graph from "./Graph";
import Records from "./Records";
import { css } from '@emotion/react';
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const BASEURL = process.env.REACT_APP_APIURL;
const Main = ({ dataLoaded, setDataLoaded, onSidebarToggle, setOnSidebarToggle, setOnRightToggle, setUserAccess }) => {
  const [ transferTotal, setTransferTotal ] = useState(0);
  const [ fundingTotal, setFundingTotal ] = useState(0);
  const [ withdrawTotal, setWithdrawTotal ] = useState(0);
  const [ balance, setBalance ] = useState(0);
  const [ transferDetails, setTransferDetails ] = useState([]);
  const [ fundingDetails, setFundingDetails ] = useState([]);
  const [ withdrawDetails, setWithdrawDetails ] = useState([]);
  const [ transferDetailsLength, setTransferDetailsLength ] = useState(0);
  const [ fundingDetailsLength, setFundingDetailsLength ] = useState(0);
  const [ withdrawDetailsLength, setWithdrawDetailsLength ] = useState(0);
  const [ lastThreeTransactions, setLastThreeTransactions ] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ loaded, setLoaded ] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails__checkout__app"));

  const navigate = useNavigate();
  const fetchStatistics = async () => {
    try {
      const statistics = await fetch(`${BASEURL}/v1/statistics`, {
        method: "GET",
        headers: {
          "authorization": `Bearer ${userDetails.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const result = await statistics.json();
      if(!result.status){
        toast.error(`Error: ${result.message}`, {
          position: toast.POSITION.TOP_RIGHT
        })
        return;
      }
      setTransferTotal(result.transferTotal);
      setFundingTotal(result.fundingTotal);
      setWithdrawTotal(result.withdrawTotal);
      setBalance(result.balance);
      setLastThreeTransactions(result.getLastThreeTransactionDetails);
      setTransferDetailsLength(result.getTransferDetailsLength);
      setFundingDetailsLength(result.getFundingDetailsLength);
      setWithdrawDetailsLength(result.getWithdrawalDetailsLength);
      setWithdrawDetails(result.withdrawalRecord);
      setTransferDetails(result.transferRecord);
      setFundingDetails(result.fundingRecord);
      setLoaded(true);
      setDataLoaded(true);
    } catch (error) {
      setUserAccess(false);
      localStorage.removeItem("userDetails__checkout__app");
      setDataLoaded(false);
      navigate("/");
    }
    return;
  }

  useEffect(()=>{
    fetchStatistics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);//activityCounter
  return (
    <>    
    
    {
      !dataLoaded ?
      <div className='checkout__page__loader'>
        <ClipLoader color="#000" loading={true} css={override} size={100} />
      </div>
      :
      
      <div className='checkout__main__container'>
          <Header onSidebarToggle={onSidebarToggle} setOnSidebarToggle={setOnSidebarToggle} setOnRightToggle={setOnRightToggle} />
          <Statistics transferTotal={transferTotal} fundingTotal={fundingTotal} withdrawTotal={withdrawTotal} balance={balance} />
          <Graph transferDetailsLength={transferDetailsLength} withdrawDetailsLength={withdrawDetailsLength} fundingDetailsLength={fundingDetailsLength} transferDetails={transferDetails} fundingDetails={fundingDetails} withdrawDetails={withdrawDetails}/>
          <Records lastThreeTransactions={lastThreeTransactions} />
        </div>
        
      }
    </>

  )
}

export default Main