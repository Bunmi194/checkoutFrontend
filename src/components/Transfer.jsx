import React, { useState, useEffect } from "react";
import "./transfer.css";
import "../fonts.css";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { createRef } from "react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const BASEURL = process.env.REACT_APP_APIURL;
const Transfer = ({ setActivityCounter, setOnRightToggle }) => {
  const inputRefs = Array.from({ length: 6 }).map(() => createRef(null));
  // const inputRefs = new Array(6).fill(useRef(null));
  const [idempotentKey, setIdempotentKey] = useState("");
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  // const [ token, setToken ] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userDetails = JSON.parse(
    localStorage.getItem("userDetails__checkout__app")
  );

  useEffect(() => {
    setIdempotentKey(`${userDetails.user.id}${new Date().getTime()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNumber, amount]);

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const nextIndex = index + 1;
    if (e.key === "Backspace" && index > 0) {
      e.target.value = "";
      inputRefs[index - 1].current.value = "";
      inputRefs[index - 1].current.focus();
    }
    if (value.length >= 1 && nextIndex < inputRefs.length) {
      // Move focus to the next input field
      // eslint-disable-next-line no-unused-vars
      let y = nextIndex;
      inputRefs[index + 1].current.focus();
    }
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const closeModal = () => {
    setInputValues(Array(6).fill(""));
    setIsModalOpen(false);
  };
  const transferToUser = async () => {
    setInputValues(Array(6).fill(""));
    setIsVerified(true);
    if (!accountNumber || !Number(amount)) {
      setIsVerified(false);
      toast.error("Please enter a valid account number and amount", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const fundDetails = {
      amount,
      accountNumber,
      currency: "NGN",
    };
    const generateOTP = await fetch(`${BASEURL}/v1/transfer/otp`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${userDetails.token}`,
        idempotentKey: idempotentKey,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(fundDetails),
    });

    const result = await generateOTP.json();
    if (!result.status) {
      setIsVerified(false);
      setName("");
      setAccountNumber("");
      setAmount("");
      toast.error(`Error: ${result.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setIsVerified(false);
    setOnRightToggle(false);
    setIsModalOpen(true);
    return;
  };
  const verifyOTP = async () => {
    const otp = inputValues.join("");
    setInputValues(Array(6).fill(""));
    setIsModalOpen(false);
    setIsVerified(true);
    if (!accountNumber || !Number(amount)) {
      setName("");
      setAccountNumber("");
      setAmount("");
      setIsVerified(false);
      toast.error("Please enter a valid account number and amount", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const fundDetails = {
      amount,
      accountNumber,
      currency: "NGN",
      otp,
    };
    const accountDetails = await fetch(`${BASEURL}/v1/transfer/process`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${userDetails.token}`,
        idempotentKey: idempotentKey,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(fundDetails),
    });

    const result = await accountDetails.json();
    if (!result.status) {
      setIsVerified(false);
      setName("");
      setAccountNumber("");
      setAmount("");
      toast.error(`Error: ${result.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setIsVerified(false);
    setIdempotentKey("");
    setName("");
    setAccountNumber("");
    setAmount("");
    if (result.status) {
      toast.success(`${result.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        window.open("/dashboard", "_self");
      }, 3000);
      return;
    }
    toast.info(`Info: ${result.message}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  };

  const verifyAccount = async () => {
    setIsVerified(true);
    if (!accountNumber || !Number(amount) || !idempotentKey) {
      setIsVerified(false);
      toast.error("Please enter a valid account number and amount", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const fundDetails = {
      amount,
      accountNumber,
      currency: "NGN",
    };
    const accountDetails = await fetch(`${BASEURL}/v1/transfer`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${userDetails.token}`,
        idempotentkey: idempotentKey,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(fundDetails),
    });

    const result = await accountDetails.json();
    if (!result.status) {
      setIsVerified(false);
      setName("");
      setAccountNumber("");
      setAmount("");
      toast.error(`Error: ${result.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setIsVerified(false);
    setName(
      `${result.recipientDetails.firstName} ${result.recipientDetails.lastName}`
    );
    return;
  };

  const transfer = () => {
    name ? transferToUser() : verifyAccount();
    return;
  };
  return (
    <div className="checkout__transfer__container">
      <p className="checkout__transfer__text" onClick={transferToUser}>
        Transfer
      </p>
      <div className="checkout__transfer__wrapper">
        <input
          type="text"
          placeholder="Enter account number..."
          className="checkout__transfer"
          onChange={(e) => setAccountNumber(e.target.value)}
          value={accountNumber}
        />
        <div className="checkout__transfer__div">
          <input
            type="text"
            placeholder="Enter amount"
            className="checkout__transfer__amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <select className="checkout__transfer__select" disabled>
            <option value="">Currency</option>
            <option value="NGN" selected>
              NGN
            </option>
            <option value="USD">USD</option>
          </select>
        </div>
        <p className="rightSidebar__verified__details">
          <span>
            {isVerified ? (
              <ClipLoader
                color="#fff"
                loading={true}
                css={override}
                size={10}
              />
            ) : (
              name.toUpperCase()
            )}
          </span>
        </p>
        <button
          type="button"
          className="checkout__transfer__button checkout__btn__click"
          onClick={transfer}
        >
          {name ? "Transfer" : "Verify"}
        </button>
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
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          content: {
            overflow: "scroll",
            objectFit: "center",
            width: "inherit",
          },
        }}
      >
        <div>
          <div className="otp__div__close">
            <div className="">&nbsp;</div>
            <div className="otp__close" onClick={closeModal}>
              X
            </div>
            {/* X */}
          </div>
          <div className="otp__container">
            <div className="otp__text__div">
              <h2>Checkout Transfer</h2>
              <p>
                Please enter the <strong>OTP</strong> that was sent to your
                email address <strong>{userDetails.user.email}</strong>. Your
                OTP is valid for <strong>10 mins.</strong>
              </p>
            </div>
            <div className="otp__input__div">
              {inputRefs.map((ref, index) => (
                <input
                  style={{ fontFamily: "Digital" }}
                  className="otp__input no-arrows"
                  placeholder="_"
                  key={index}
                  ref={ref}
                  type="number"
                  maxLength={1}
                  onKeyUp={(e) => {
                    handleInputChange(index, e);
                  }}
                />
              ))}
            </div>
            <div className="otp__btn__div">
              <button onClick={verifyOTP}>Validate OTP</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Transfer;
