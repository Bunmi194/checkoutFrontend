import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const BASEURL = process.env.REACT_APP_APIURL;
function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    window.open(`${BASEURL}/v1/strategy/auth/google`, "_self");
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!email || !password || !firstName || !lastName) {
        setIsLoading(false);
        toast.error("Please fill all fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (password !== confirmpassword) {
        setIsLoading(false);
        toast.error("Passwords do not match", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const signup = await fetch(`${BASEURL}/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: confirmpassword,
          lastName,
          firstName,
        }),
      });

      const result = await signup.json();
      if (!result || !result.status) {
        setIsLoading(false);
        toast.error(`Error: ${result ? result.message : "Signup failed"}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      localStorage.setItem("userEmail", JSON.stringify(email));
      setEmail("");
      setPassword("");
      setLastName("");
      setFirstName("");
      toast.success(`${result.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      setTimeout(() => {
        navigate("/success");
      }, 5000);
      return;
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
      toast.error(`Error: ${"Internal Server Error"}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-image"></div>
      <form className="signup-form">
        <div className="checkout__signup__div">
          <div className="checkout__app__header">
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
          <div>
            <p className="chat__redirect__text">
              <span>Have an account?</span>{" "}
              <a href="/" className="checkout__login__signup__btn">
                Login
              </a>
            </p>
          </div>
        </div>
        <div className="checkout__signup__wrapper">
          <div className="checkout__signup__inner__wrapper">
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="checkout__signup__input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="checkout__signup__input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="checkout__signup__input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="checkout__signup__input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="checkout__signup__input"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="checkout__btnsignup"
              onClick={handleSignup}
            >
              {isLoading ? (
                <ClipLoader
                  color="#fff"
                  loading={true}
                  css={override}
                  size={15}
                />
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="chat__or__block">
              <div className="chat__line__div"></div>
              <div>
                <p className="chat__or__text">Or</p>
              </div>
              <div className="chat__line__div"></div>
            </div>
            <button
              type="submit"
              className="checkout__btnsignup__google"
              onClick={handleGoogleSignup}
            >
              Continue with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
