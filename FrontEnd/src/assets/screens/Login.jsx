import React, { useRef } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios'
function Login() {
  const email = useRef("");
  const password = useRef("");

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/signup");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login',{email:email.current.value,password:password.current.value})
    .then((res)=>{
      console.log(res)
      email.current.value = ''
      password.current.value = ''
      localStorage.setItem("authToken",res.data.authToken)
      // console.log(localStorage.getItem('authToken'))
      navigate('/')
    }).catch((err)=>{
      alert(err)
    })
    
  };
  return (
    <div className="container w-25 mt-5 border border-secondary p-5 rounded sbox">
      <div className="shead">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="lbtn text-center">
        <button type="submit" className="btn btn-primary w-100" >
          Sign In
        </button>
      </div>
      </form>
      <div className="isuser text-center mt-2 mb-1 w-100">
        <h6>Not an user ?</h6>
      </div>
      <div className="sbtn text-center">
          <button  className="btn btn-primary w-100" onClick={handleRedirect}>
            Sign Up
          </button>
        </div>

    </div>
  );
}

export default Login;
