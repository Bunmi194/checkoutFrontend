import React from 'react';
import "./withdraw.css";

const Withdraw = () => {
  return (
    <div className='checkout__withdrawal__container'>
        <p className='checkout__withdraw__text'>Withdraw</p>
        <div className='checkout__withdraw__wrapper'>
            <input type="text" placeholder="Enter account number..." className='checkout__withdraw'/>
            <div className='checkout__withdraw__div'>
                <input type="text" placeholder="Enter amount" className='checkout__withdraw__amount'/>
                <select className='checkout__withdraw__select'>
                    <option value="" selected>Currency</option>
                    <option value="NGN" >NGN</option>
                    <option value="USD">USD</option>
                </select>
            </div>
                <button type='button' className='checkout__withdraw__button checkout__btn__click'>Withdraw</button>
        </div>
    </div>
  )
}

export default Withdraw