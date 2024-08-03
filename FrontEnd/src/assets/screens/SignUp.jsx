import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function SignUp() {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const location = useRef("");
  const mobile = useRef("");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };
  function isNumeric(value) {
    return !isNaN(value) && isFinite(Number(value));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mobile.current.value.length)
    if(mobile.current.value.length !== 10 || !isNumeric(mobile.current.value)){
      return alert("Enter a valid Mobile Number !!") 
    }
    axios.post(`${import.meta.env.VITE_HOST_URL}/signup`, {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      location: location.current.value,
      mobile:mobile.current.value
    })
    .then((res) => {
      name.current.value = '';
      email.current.value = '';
      password.current.value = '';
      location.current.value = '';
      mobile.current.value = ''
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
      alert('Internal server Error');
    });
  };

  return (
    <div className="container mt-5 border border-secondary p-5 sbox rounded">
      <div className="shead">
        Register
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"><b>Name</b></label>
          <input type="text" className="form-control" ref={name} placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
          <b>Email Address</b>
          </label>
          <input
            ref={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
          <b>Password</b>
          </label>
          <input
            ref={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label"><b>Mobile</b> </label>
          <input type="text" className="form-control" ref={mobile} placeholder="Enter your mobile number"/>
        </div>
        <div className="mb-3">
          <label className="form-label"><b>Location</b></label>
          <input type="text" className="form-control" ref={location} placeholder="Enter your location" />
        </div>
        <div className="sbtn text-center">
          <button type="submit" className="btn btn-primary w-100 ">
            Sign Up
          </button>
        </div>
      </form>
      <div className="isuser text-center mt-2 mb-1 w-100">
        <h6>Already a user?</h6>
      </div>
      <div className="lbtn text-center">
        <button className="btn btn-primary w-100" onClick={handleRedirect}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUp;
