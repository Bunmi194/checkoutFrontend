import React, { useEffect } from 'react';
import "./records.css";

const Records = ({ lastThreeTransactions }) => {
    const getOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return "th";
        }
      
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }
      
    const formatDate = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(newDate);
        const year = newDate.getFullYear();
        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    }


useEffect(()=>{

}, [ lastThreeTransactions ]);

  return (
    <div className='checkout__main__table__container'>
        <table className='my-table'>
            <thead>
                <tr>
                    <td>S/N</td>
                    <td>Beneficiary</td>
                    <td>Amount</td>
                    <td>Type</td>
                    <td>Date</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {
                    lastThreeTransactions.length?
                    lastThreeTransactions && lastThreeTransactions.map((record, index)=> (
                        <tr key={record? record.id : ""} className="checkout__main__rows">
                            <td>{++index}</td>
                            <td>{`${record.User? record.User.firstName : ""} ${record.User? record.User.lastName : ""} (${record? record.recipientId : "self"})`}</td>
                            <td>{Number(record? record.amount : 0).toLocaleString() || ""}</td>
                            <td>{record? `${record.typeOfTransaction}`.toUpperCase() : ""}</td>
                            <td>{record? formatDate(record.createdAt) : ""}</td>
                            <td className='completed'><span className={`${record? record.status === "completed"? "completed__text" : record.status === "failed"? "red" : "yellow" : ""}`}>{record? record.status : ""}</span></td>
                        </tr>
                    ))
                    :
                    <div className='records__no__record__div'>
                        <div>
                            <h3 className='checkout__record__no__record__text'>No Record Found</h3>
                            <img src='/memo.png' alt="No Record" className='records__no__record__img' />
                        </div>
                    </div>
                }
            </tbody>
        </table>
    </div>
  )
}

export default Records