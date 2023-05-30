import React from 'react';
import "./records.css";

const recordValues = [
    {
        id: "1",
        beneficiary: 'John Doe',
        amount: 400,
        currency: "USD",
        date: "7 July 2023",
        status: "Completed"
    },
    {
        id: "2",
        beneficiary: 'John Smith',
        amount: 600,
        currency: "USD",
        date: "9 July 2023",
        status: "Completed"
    },
    {
        id: "3",
        beneficiary: 'Abike Doe',
        amount: 4000,
        currency: "NGN",
        date: "11 July 2023",
        status: "Completed"
    },
    
]
const Records = () => {
  return (
    <div className='checkout__main__table__container'>
        <table className='my-table'>
            <thead>
                <tr>
                    <td>S/N</td>
                    <td>Beneficiary</td>
                    <td>Amount</td>
                    <td>Currency</td>
                    <td>Date</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {
                    recordValues && recordValues.map((record, index)=> (
                        <tr key={record.id} className="checkout__main__rows">
                            <td>{++index}</td>
                            <td>{record.beneficiary}</td>
                            <td>{record.amount}</td>
                            <td>{record.currency}</td>
                            <td>{record.date}</td>
                            <td className='completed'><span className='completed__text'>{record.status}</span></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Records