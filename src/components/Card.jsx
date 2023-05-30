import React from 'react'
import "./card.css";

const Card = () => {
  return (
    <div className='checkout__card__container'>
        <div className='checkout__rightsidebar__container'>
            <div>
                <p className='checkout__card__company'>Checkout Card</p>
            </div>
            <div>
                <p>
                    <span className='checkout__card__span'>****</span> 
                    <span className='checkout__card__span'>****</span> 
                    <span className='checkout__card__span'>****</span> 
                    <span className='checkout__card__span'>2023</span> 
                </p>
            </div>
            <div className='checkout__rightsidebar__bottom'>
                <div>
                    <p className='checkout__card__details'>John Doe</p>
                </div>
                <div>
                    <p className='checkout__card__details'>06/09</p>
                </div>
                <div>
                        <img src="/visacard.png" alt="bank card" className='checkout__visacard'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card