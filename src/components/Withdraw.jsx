import React, { useState, createRef, useEffect } from 'react';
import "./withdraw.css";import "../fonts.css";
import { css } from '@emotion/react';
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Modal from "react-modal";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const bankDetailsFromCBN = [
  {
    code: "057",
    name: "ZENITH"
  },
  {
    code: "044",
    name: "ACCESS"
  },
  {
    code: "050",
    name: "ECOBANK"
  },
  {
    code: "070",
    name: "FIDELITY"
  },
  {
    code: "011",
    name: "FIRSTBANK"
  },
  {
    code: "214",
    name: "FCMB"
  },
  {
    code: "058",
    name: "GTBANK"
  },
  {
    code: "030",
    name: "HERITAGE"
  },
  {
    code: "082",
    name: "KEYSTONE"
  },
  {
    code: "039",
    name: "STANBIC"
  },
  {
    code: "232",
    name: "STERLING"
  },
  {
    code: "032",
    name: "UNIONBANK"
  },
  {
    code: "033",
    name: "UBA"
  },
  {
    code: "215",
    name: "UNITY"
  },
  {
    code: "035",
    name: "WEMA"
  },
]
const Withdraw = ({ setActivityCounter }) => {
  const newBank = bankDetailsFromCBN.sort((a,b)=> a.name > b.name? 1 : -1)
  console.log("newBank: ", newBank);
    const inputRefs = Array.from({ length: 6 }).map(() => createRef(null));
    // const inputRefs = new Array(6).fill(useRef(null));
    const [ idempotentKey, setIdempotentKey ] = useState("");
    const [inputValues, setInputValues] = useState(Array(6).fill(''));
    const [ amount, setAmount ] = useState("");
    const [ accountNumber, setAccountNumber ] = useState("");
    const [ bankCode, setBankCode ] = useState("");
    const [ name, setName ] = useState("");
    // const [ token, setToken ] = useState("");
    const [ isVerified, setIsVerified ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    

    useEffect(() => {
      setIdempotentKey(`${userDetails.user.id}${new Date().getTime()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountNumber, amount]);

    const handleInputChange = (index, e) => {
      console.log("key: ", e);
      // console.log("token: ", token);
      const value = e.target.value;
      const nextIndex = index + 1;
      if(e.key === "Backspace" && index > 0){
        e.target.value = ""
        inputRefs[index - 1].current.value = "";
        inputRefs[index - 1].current.focus();
      }
      // console.log("nextIndex: ", nextIndex);
  //1234
      // Set the value of the current input field
      // ...
  
      if (value.length >= 1 && nextIndex < inputRefs.length) {
        // Move focus to the next input field
        console.log("index: ", index);
        console.log("value: ", value);
        // console.log("inputRefs: ", inputRefs);
        let y = nextIndex;
        inputRefs[index+1].current.focus();
        console.log("inputRefs Number: ", inputRefs[index].current.value);
        // console.log("token: ", token);
        console.log("inputRefsIN: ", inputRefs);
      }
      // setToken((prev)=> prev += inputRefs[index].current.value);
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };
    const closeModal = () => {
      setInputValues(Array(6).fill(''));
      setIsModalOpen(false);
    }

    const verifyOTP = async () => {
      const otp = inputValues.join("");
      setInputValues(Array(6).fill(''));
      setIsModalOpen(false);
        setIsVerified(true);
        if(!accountNumber || !Number(amount) || !bankCode || !otp){
          setIsVerified(false);
          toast.error("Please enter the OTP sent to your email", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
        }
        
        const fundDetails = {
          amount,
          bankAccount: accountNumber,
          currency: "NGN",
          bank: bankCode,
          nameOnAccount: name,
          otp
        }
        const accountDetails = await fetch("http://localhost:4000/v1/withdraw/initiate", {
          method: "POST",
          headers: {
            "authorization": `Bearer ${userDetails.token}`,
            "idempotentkey": idempotentKey,
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(fundDetails)
        });
  
        const result = await accountDetails.json();
        if(!result.status){
          setIsVerified(false);
          toast.error(`Error: ${result.message}`, {
            position: toast.POSITION.TOP_RIGHT
          });
          setName("");
          console.log("name: ", name);
          return;
        }
        setIsVerified(false);
        setIdempotentKey("");
        setName("");
        setAccountNumber("");
        setAmount("");
        setBankCode("");
        console.log("result: ", result);
        if(result.status){
          toast.success(`${result.message}`, {
            position: toast.POSITION.TOP_RIGHT
          });
          setTimeout(()=>{
            window.open("/dashboard", "_self");
          }, 3000);
          return;
        }
        toast.info(`Info: ${result.message}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      
    }

    const withdrawMoney = async () => {
      setInputValues(Array(6).fill(''));
        setIsVerified(true);
        if(!accountNumber || !Number(amount) || !bankCode){
          setIsVerified(false);
          toast.error("Please enter a valid account number, amount and bank", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
        }
        const fundDetails = {
          amount,
          bankAccount: accountNumber,
          currency: "NGN",
          bank: bankCode,
        }
        const generateOTP = await fetch("http://localhost:4000/v1/withdraw/otp", {
          method: "POST",
          headers: {
            "authorization": `Bearer ${userDetails.token}`,
            "idempotentkey": idempotentKey,
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(fundDetails)
        });
  
        const result = await generateOTP.json();
        if(!result.status){
          setIsVerified(false);
          toast.error(`Error: ${result.message}`, {
            position: toast.POSITION.TOP_RIGHT
          });
          setName("");
          setIdempotentKey("");
          console.log("name: ", name);
          return;
        }
        setIsVerified(false);
        setIsModalOpen(true);
        console.log("result: ", result);
        return;
      
    }

    const verifyAccount = async () => {
      console.log("accountNumber: ", accountNumber)
      console.log("bankCode: ", bankCode)
      console.log("Number(amount): ", Number(amount))
      console.log("!Number(amount): ", !Number(amount))
      
      if(!idempotentKey){
        setIdempotentKey(`${userDetails.user.id}${new Date().getTime()}`);
      }
      setIsVerified(true);
      if(!accountNumber || !Number(amount) || !bankCode){
        setIsVerified(false);
        toast.error("Please enter a valid account number, amount and bank", {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      const fundDetails = {
        amount,
        bankAccount: accountNumber,
        currency: "NGN",
        bank: bankCode,
      }
      const accountDetails = await fetch("http://localhost:4000/v1/withdraw", {
        method: "POST",
        headers: {
          "authorization": `Bearer ${userDetails.token}`,
          "idempotentkey": idempotentKey,
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(fundDetails)
      });

      const result = await accountDetails.json();
      if(!result.response.status){
        setIsVerified(false);
        toast.error(`Error: ${result.response.message}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      setIsVerified(false);
      console.log("result: ", result);
      if(result.response.status === true) {
        setName(`${result.response.data.account_name}`);
      }
      return;
    }

    const withdrawFromWallet = () => {
      name ? withdrawMoney() : verifyAccount();
      return;
    }
  return (
    <div>
        <div className='checkout__withdrawal__container'>
            <p className='checkout__withdraw__text'>Withdraw</p>
            <div className='checkout__withdraw__wrapper'>
                <input type="text" placeholder="Enter account number..." className='checkout__withdraw' onChange={(e)=>setAccountNumber(e.target.value)} value={accountNumber} />
                <div className='checkout__withdraw__div'>
                    <input type="text" placeholder="Enter amount..." className='checkout__withdraw__amount' onChange={(e)=>setAmount(e.target.value)} value={amount} />
                    <select className='checkout__withdraw__select' onChange={(e)=>setBankCode(e.target.value)} value={bankCode}>
                      <option value="" >BANK</option>
                        {
                          (newBank && newBank.map((bank, index) => {
                            return <option key={++index} value={bank.code}>{`${bank.name}`.toUpperCase()}</option>
                          }))
                        }
                    </select>
                </div>

                <p className='rightSidebar__verified__details'><span>{isVerified? <ClipLoader color="#fff" loading={true} css={override} size={10} /> : name.toUpperCase()}</span></p>
                <button type='button' className='checkout__withdraw__button checkout__btn__click' onClick={withdrawFromWallet}>{name? "Withdraw" : "Verify"}</button>
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
                <h2>Checkout Transfer</h2>
                <p>Please enter the <strong>OTP</strong> that was sent to your email address <strong>{userDetails.user.email}</strong>. Your OTP is valid for <strong>10 mins.</strong></p>
              </div>
              <div className='otp__input__div'>
              {inputRefs.map((ref, index) => (
                <input
                  style={{fontFamily: "Digital"}}
                  className='otp__input no-arrows'
                  placeholder='_'
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
              <div className='otp__btn__div'>
                <button onClick={verifyOTP}>Validate OTP</button>
              </div>
            </div>
          </div>
        </Modal>
    </div>
  )
}

export default Withdraw