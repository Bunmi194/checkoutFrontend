import React, { useEffect } from 'react';
import "./statistics.css";

const Statistics = ({ transferTotal, withdrawTotal, fundingTotal, balance }) => {

const statistics = [
    {
        title: "Total Income",
        amount: Number(fundingTotal).toLocaleString(),
        source: "Funding"
    },
    {
        title: "Balance",
        amount: Number(balance).toLocaleString(),
        source: "Wallet"
    },
    {
        title: "Expenditure",
        amount: Number(Number(transferTotal) + Number(withdrawTotal)).toLocaleString(),
        source: "W & T"
    }
];
useEffect(()=>{

}, [transferTotal, withdrawTotal, fundingTotal]);

  return (
    <div className='checkout__statistics__wrapper'>
        {
            statistics && statistics.map((statistic) => (

        <div className='checkout__main__stats__container'>
            <div>
                <p className='checkout__statistics__title'>{statistic.title}</p>
                <p className={`checkout__statistics__amount ${statistic.source === "Funding"? "white" : statistic.source === "Wallet" ? "green" : "reed"}`}>&#8358; {statistic.amount || 0}</p>
                <p className='checkout__statistics__source'>{statistic.source}</p>
            </div>
            <div className='checkout__main__statistics__increase'>
                <p><img src={statistic.source === "Funding"? "profit.png" : statistic.source === "Wallet" ? "newwallet.png" : "expenses.png"} alt={"expenses"} className="checkout__statistics__icon"/></p>
            </div>
        </div>
            )
                
            )
        }
    </div>
  )
}

export default Statistics