import React from 'react'
import { FiArrowUpRight } from "react-icons/fi";
import "./statistics.css";

const statistics = [
    {
        title: "Total Income",
        amount: 5000,
        source: "In Funding"
    },
    {
        title: "Available Balance",
        amount: 5000,
        source: "In Funding"
    },
    {
        title: "Total Expenditure",
        amount: 5000,
        source: "In Funding"
    }
]
const Statistics = () => {
  return (
    <div className='checkout__statistics__wrapper'>
        {
            statistics && statistics.map((statistic) => (

        <div className='checkout__main__stats__container'>
            <div>
                <p>{statistic.title}</p>
                <p>&#8358; {statistic.amount}</p>
                <p>{statistic.source}</p>
            </div>
            <div className='checkout__main__statistics__increase'>
                <p>36% <FiArrowUpRight /></p>
            </div>
        </div>
            )
                
            )
        }
    </div>
  )
}

export default Statistics