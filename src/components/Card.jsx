import React from "react";
import "./card.css";

const Card = () => {
  let userDetails = JSON.parse(
    localStorage.getItem("userDetails__checkout__app")
  );
  let accountNumber = userDetails.user.id;

  return (
    <div className="checkout__card__container">
      <div className="checkout__rightsidebar__container">
        <div>
          <p className="checkout__card__company">Checkout Account Details</p>
        </div>
        <div>
          <p>
            <span className="checkout__card__span">****</span>
            <span className="checkout__card__span">
              {accountNumber ? `**${accountNumber}`.slice(0, 4) : "****"}
            </span>
            <span className="checkout__card__span">
              {accountNumber ? `${accountNumber}`.slice(2, 6) : "****"}
            </span>
            <span className="checkout__card__span">
              {accountNumber ? `${accountNumber}`.slice(6, 10) : "****"}
            </span>
          </p>
        </div>
        <div className="checkout__rightsidebar__bottom">
          <div>
            <p className="checkout__card__details">{`${
              userDetails ? userDetails.user.firstName : ""
            } ${userDetails ? userDetails.user.lastName : "Anonymous Acc"}`}</p>
          </div>
          <div>
            <p className="checkout__card__details">06/09</p>
          </div>
          <div>
            <img
              src="/visacard.png"
              alt="bank card"
              className="checkout__visacard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
