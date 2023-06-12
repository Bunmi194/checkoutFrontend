import React from 'react'
import "./header.css";
import { IoIosNotificationsOutline } from "react-icons/io";
const Header = () => {
  return (
    <div className='checkout__main__header__container'>
        <div className='checkout__main__header__content'>
            <h3>Overview</h3>
            <p className='checkout__main__header__text'>Manage your personal finance in just one step</p>
        </div>
        <div className='checkout__main__images__header'>
            <div>
                <IoIosNotificationsOutline className='checkout__main__notification'/>
            </div>
            <div>
                <img src="/user.png" alt='user icon' className='checkout__user__image'/>
            </div>
        </div>
    </div>
  )
}

export default Header