import React from 'react';
import "./fundwallet.css";

const FundWallet = () => {
  return (
    <div className='checkout__fundwallet__container'>
        <p className='checkout__fundwallet__text'>Fund Wallet</p>
        <div className='checkout__fundwallet__wrapper'>
            <div className='checkout__fundwallet__input__div'>
                <input type="text" className="checkout__fundwallet__input" placeholder="Enter amount..." />
            </div>
            <div className='checkout__fundwallet__button__div'>
                <button type="button" className="checkout__fundwallet__btn checkout__btn__click" >Fund</button >
            </div>
        </div>
    </div>
  )
}

export default FundWallet