import React from 'react';
import "./transfer.css";

const Transfer = () => {
  return (
    <div className='checkout__transfer__container'>
        <p className='checkout__transfer__text'>Transfer</p>
        <div className='checkout__transfer__wrapper'>
            <input type="text" placeholder="Enter account number..." className='checkout__transfer'/>
            <div className='checkout__transfer__div'>
                <input type="text" placeholder="Enter amount" className='checkout__transfer__amount'/>
                <select className='checkout__transfer__select'>
                    <option value="" selected>Currency</option>
                    <option value="NGN" >NGN</option>
                    <option value="USD">USD</option>
                </select>
            </div>
                <button type='button' className='checkout__transfer__button checkout__btn__click'>Send</button>
        </div>
    </div>
  )
}

export default Transfer