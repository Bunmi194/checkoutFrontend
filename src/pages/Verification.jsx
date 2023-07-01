import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verification.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Verification = () => {
  const [verifying, setVerifying] = useState(true);
  const [failed, setFailed] = useState(false);
  const coffee = "\u2615";
  const confetti = "\uD83C\uDF8A";
  const heart = "\uD83D\uDC96";
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");
  const verifyUserAccount = async () => {
    try {
      if (!token) {
        navigate("/");
      }
      const verify = await fetch(
        `http://localhost:4000/v1/users/verify/${token}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const result = await verify.json();
      console.log("result: ", result);
      if (result && result.status) {
        setVerifying(false);
        toast.success(`${result.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return result;
      }
      setFailed(true);
      toast.error(`Error: ${result.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log("Error: ", error);
      setVerifying(false);
      toast.error(`Error: Internal Server Error`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    //make verification check
    verifyUserAccount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="verification-message">
      <div className="verification-message-content">
        <div className="checkout__app__header__verify">
          <div>
            <img
              className="checkout__app-logo"
              src="/checkout.png"
              alt="Chat App Logo"
            />
          </div>
          <div>
            <h2 className="app-name">Checkout</h2>
          </div>
        </div>
        <h1 className="checkout__signupmessage">
          {failed
            ? "Verification Failed"
            : verifying
            ? "Verifying Account..."
            : `Account Verified ${heart}`}
        </h1>
        <div className="checkout__loader">
          {failed ? (
            <img
              src="/cancel.png"
              alt="failed"
              className="checkout__account__verified"
            />
          ) : verifying ? (
            <ClipLoader color="#000" loading={true} css={override} size={50} />
          ) : (
            <img
              src="/verify.png"
              alt="verified"
              className="checkout__account__verified"
            />
          )}
        </div>
        <p className="verification-text">
          {failed
            ? "Oops! Something went wrong"
            : verifying
            ? `Would you like a cup of coffee ${coffee} while we verify your account?`
            : `Your account has been successfully verified ${confetti}`}
        </p>
        <a
          href="/"
          className={`${
            verifying
              ? "checkout__mail__redirect hide"
              : "checkout__mail__redirect"
          }`}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default React.memo(Verification);
