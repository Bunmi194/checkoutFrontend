import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./graph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart showing money flow',
    },
  },
};




const Graph = ({ transferDetailsLength, withdrawDetailsLength, fundingDetailsLength, transferDetails, fundingDetails, withdrawDetails }) => {

// const labels = ['', '', '', '', '', '', '', '', '', '', '', ''];
const labels = new Array(Math.max(transferDetailsLength, withdrawDetailsLength, fundingDetailsLength)).fill("");
console.log("labels: ", labels);
console.log("max: ", Math.max(transferDetailsLength, withdrawDetailsLength, fundingDetailsLength));
console.log(transferDetailsLength, withdrawDetailsLength, fundingDetailsLength)
//labels = new Array(length of longest);
//labels.fill("");
//labels should be Array.fill(length of the longest of firstValue, secondValue and thirdValue)

// const transferData = transferDetails.map(transfer => {
//   return transfer.amount;
// });

const transferDataFunction = () => {
  let result = [0];
  if(transferDetails && transferDetails.length){
    result = transferDetails.map(transfer => {
      return transfer.amount;
    });
  }
  return result
}
const fundingDataFunction = () => {
  let result = [0];
  if(fundingDetails && fundingDetails.length){
    result = fundingDetails.map(fund => {
      return fund.amount;
    });
  }
  return result
}
const withdrawalDataFunction = () => {
  let result = [0];
  if(withdrawDetails && withdrawDetails.length){
    result = withdrawDetails.map(withdraw => {
      return withdraw.amount;
    });
  }
  return result
}
const transferData = transferDataFunction();
const fundingData = fundingDataFunction();
const withdrawalData = withdrawalDataFunction();
console.log("details: ", transferData, withdrawalData, fundingData)

// const fundingData = fundingDetails.map(fund => {
//   return fund.amount;
// });
// const withdrawalData = withdrawDetails.map(withdraw => {
//   return withdraw.amount;
// });

const data = {
  labels,
  datasets: [
    {
      label: 'Transfers',
      data: labels.map((index, i) => transferData[i]),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Wallet Funding',
      data: labels.map((index, i) => fundingData[i]),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Withdrawals',
      data: labels.map((index, i) => withdrawalData[i]),
      borderColor: 'rgb(150, 132, 235)',
      backgroundColor: 'rgba(150, 132, 235, 0.5)',
    },
  ],
};


useEffect(()=>{

}, [ transferDetailsLength, withdrawDetailsLength, fundingDetailsLength, transferDetails, fundingDetails, withdrawDetails ]);

  return (
    <div className='checkout__main__graph__wrapper'>
        <Line options={options} data={data} />
    </div>
  )
}

export default Graph;
