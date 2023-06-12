import React, { useState } from 'react';
import "./sidebar.css";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbFileInvoice } from "react-icons/tb";
import { IoAnalyticsOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { AiOutlineLock } from "react-icons/ai";
import Modal from "react-modal";
import { Navigate, useNavigate } from 'react-router-dom';

const features = [
    {
        name: "Dashboard",
        icon: <MdOutlineDashboard />
    },
    {
        name: "Fund Wallet",
        icon: <AiOutlineCreditCard />
    },
    {
        name: "Transfer",
        icon: <TbFileInvoice />
    },
    {
        name: "Withdraw",
        icon: <BiMoneyWithdraw />
    },
    {
        name: "Analytics",
        icon: <IoAnalyticsOutline />
    }
];

const tools = [
    {
        name: "Help & Support",
        icon: <BiSupport />
    },
    {
        name: "Settings",
        icon: <IoSettingsOutline />
    }
    
]
const Sidebar = ({ setUserAccess, setDataLoaded }) => {

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ feature, setFeature ] = useState("");
    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
      }
    
    const logoutModal = () => {
        setIsModalOpen(true);
    }
    const stayLoggedIn = () => {
        closeModal();
    }
    const logMeOut = (feature) => {
        setUserAccess(false);
        localStorage.removeItem("userDetails");
        setDataLoaded(false);
        navigate("/");
    }
    
  return (
    <div>
        <div className='checkout__sidebar__container'>
            <div className='checkout__sidebar__content__container'>
                <div className='checkout__sidebar__logo__wrapper'>
                    <div>
                        <img src="/checkout.png" alt="company logo" className='checkout__logo__image'/>
                    </div>
                    <div>
                        <span className='checkout__sidebar__logo'>Checkout</span>
                    </div>
                </div>
                <div className='checkout__features'>
                    <p className='checkout__sidebar__general'>General</p>
                    { 
                    features && features.map(feature => (
                        <div>
                            <div className={feature.name === "Dashboard"? `checkout__sidebar__features` : `checkout__sidebar__features__locked`} >
                                <div>
                                    {feature.icon}
                                </div>
                                <div>
                                    <p className='checkout__sidebar__feature__name'>{feature.name}</p>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <hr />
                <div>
                    <p className='checkout__sidebar__tools'>Tools</p>
                    { tools && tools.map(tool => (
                        <div>
                        <div className='checkout__sidebar__features__locked'>
                            <div>
                                {tool.icon}
                            </div>
                            <div>
                                <p className='checkout__sidebar__feature__name'>{tool.name}</p>
                            </div>
                        </div>
                    </div>
                    ))
                    }
                </div>

            </div>
            <div className='checkout__sidebar__logout' onClick={logoutModal}>
                <div>
                    <CiLogout />
                </div>
                <div>
                    <p className='checkout__sidebar__logout__text'>Logout</p>
                </div>
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="custom-modal"
            bodyOpenClassName="custom-overlays"
            shouldFocusAfterRender={true}
            shouldCloseOnOverlayClick={true}
            shouldReturnFocusAfterClose={true}
            preventScroll={true}
            closeTimeoutMS={1000}
            ariaHideApp={false}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                },
                content: {
                }
            }}
        > 
            <div>
                <div className='otp__div__close'>
                    <div className=''>&nbsp;</div>
                    <div className='otp__close' onClick={closeModal}>X</div>
                {/* X */}
                </div>
                <div className="otp__container">
                    <div className='otp__text__div'>
                        <h2>Checkout </h2>
                        <p>Are you sure you want to logout of your account?</p>
                    </div>
                
                    <div className='logoutModal'>
                        <div className='logoutModal__child'>
                            <button onClick={stayLoggedIn}>Keep me in</button>
                        </div>
                        <div className='logoutModal__child'>
                            <button onClick={logMeOut}>Log me out</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default Sidebar