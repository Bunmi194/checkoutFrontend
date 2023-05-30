import React from 'react';
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
const Sidebar = () => {
  return (
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
            <div>
                <p className='checkout__sidebar__general'>General</p>
                { 
                features && features.map(feature => (
                    <div>
                        <div className={feature.name === "Dashboard"? `checkout__sidebar__features` : `checkout__sidebar__features__locked`}>
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
        <div className='checkout__sidebar__logout'>
            <div>
                <CiLogout />
            </div>
            <div>
                <p className='checkout__sidebar__logout__text'>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar