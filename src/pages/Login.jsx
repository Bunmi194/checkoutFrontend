import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { css } from '@emotion/react';
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import './login.css';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function LoginPage({setUserAccess}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
//   const location = useLocation();


//   const params = new URLSearchParams(location.search);
//   const token = params.get('token');
//   const googleEmail = params.get('email');
//   const firstName = params.get('firstName');
//   const lastName = params.get('lastName');
//   const id = params.get('id');

//   useEffect(()=>{
//     if(token && googleEmail && firstName && lastName && id) {
//       googleLoginOrSignup();
//     }
//   }, []);

//   const handleGoogleLogin = () => {
//     window.open("http://localhost:4000/v1/strategy/auth/google", "_self");
//   }
//   const googleLoginOrSignup = () => {
//     const userObject = {
//       token,
//       userExists: [
//         {
//           email: googleEmail,
//           firstName,
//           lastName,
//           _id: id,
//         }
//       ]
//     };

//     console.log("userObject: ", userObject);

//     localStorage.setItem("userDetails", JSON.stringify(userObject));
//     setUserAccess(true);
//     window.open('/chat', "_self");
//     return;

//   }
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
    setIsLoading(true);
    if(!email || !password) { 
      setIsLoading(false);
      toast.error('Please enter your email and password', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    const login = await fetch("http://localhost:4000/v1/users/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const result = await login.json();
    console.log("result: ", result);
    if(!result || !result.status) {
      setIsLoading(false);
      toast.error(`Error: ${result.message}`, {
        position: toast.POSITION.TOP_RIGHT
      })
      return;
    };
    setIsLoading(false);
    localStorage.setItem("userDetails", JSON.stringify(result));
    setUserAccess(true);
    toast.success(`${result.message}`, {
      position: toast.POSITION.TOP_RIGHT
    })
    setTimeout(()=> {
      navigate('/dashboard');
    }, 4000);
    return;
    } catch (error) {
      setIsLoading(false);
      setUserAccess(false);
      toast.error(`Error: Internal Server Error`, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <form className="login-form">
      <div className='checkout__login__signup__div'>
        <div className='checkout__app__header'>
            <div>
              <img className="checkout__app-logo" src="/checkout.png" alt="Chat App Logo" />
            </div>
            <div>
              <h2 className="app-name">Checkout</h2>
            </div>
        </div>
        <div>
          <p className='chat__redirect__text'>Don't have an account? <a href="/register" className='checkout__login__signup__btn'>Sign Up</a></p>
        </div>
      </div>
        <div className='checkout__login__wrapper'>
          <div className='checkout__login__inner__wrapper'>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" required onChange={(e)=>{
                setEmail(e.target.value);
              }} className="checkout__login__input" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required onChange={(e)=>{
                setPassword(e.target.value);
              }} className="checkout__login__input"/>
            </div>
            <button disabled={isLoading} type="submit" className="checkout__btnlogin" onClick={handleLogin}>{isLoading? <ClipLoader color="#000" loading={true} css={override} size={15} /> : "Login"}</button>
            <div className='chat__or__block'>
              <div className='chat__line__div'></div>
              <div>
                <p className='chat__or__text'>Or</p>
              </div>
              <div className='chat__line__div'></div>
            </div>
            <button type="submit"  className="checkout__btnlogin__google" >Continue with Google</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
