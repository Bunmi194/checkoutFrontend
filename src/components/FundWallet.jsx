import React, { useState } from "react";
import "./fundwallet.css";
import { toast } from "react-toastify";
import { useEffect } from "react";

const BASEURL = process.env.REACT_APP_APIURL;
const FundWallet = ({ setActivityCounter, setOnRightToggle }) => {
  const [amount, setAmount] = useState("");
  const [isFunding, setIsFunding] = useState(false);
  let token;

  useEffect(() => {
    const userDetails = JSON.parse(
      localStorage.getItem("userDetails__checkout__app")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = userDetails.token;
  });
  const fundWallet = async () => {
    setOnRightToggle(false);
    setIsFunding(true);
    if (!amount || !Number(amount)) {
      setIsFunding(false);
      return toast.error(`Error: Please enter a valid amount`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!token) {
      setIsFunding(false);
      return toast.error(`Error: Token not set`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const fundData = {
      gateway: "paystack",
      amount,
      currency: "NGN",
      typeOfTransaction: "fund",
      phoneNumber: "nil",
      booking: "nil",
      redirect_url: "https://www.google.com",
    };

    const fundAccount = await fetch(`${BASEURL}/v1/fund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(fundData),
    });

    const response = await fundAccount.json();
    if (!response || !response.status) {
      setIsFunding(false);
      return toast.error(`Error: ${response.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    //redirect
    const url = response.response.data.authorization_url;
    window.open(url, "_self");
    return;
  };

  return (
    <div className="checkout__fundwallet__container">
      <p className="checkout__fundwallet__text">Fund Wallet</p>
      <div className="checkout__fundwallet__wrapper">
        <div className="checkout__fundwallet__input__div">
          <input
            type="text"
            className="checkout__fundwallet__input"
            placeholder="Enter amount..."
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="checkout__fundwallet__button__div">
          <button
            type="button"
            className="checkout__fundwallet__btn checkout__btn__click"
            onClick={fundWallet}
            disabled={isFunding}
          >
            <span className="checkout__fund__text">Fund</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
