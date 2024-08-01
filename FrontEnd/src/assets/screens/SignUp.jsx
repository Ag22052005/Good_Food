import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function SignUp() {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const location = useRef("");

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_HOST_URL}/signup`, {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      location: location.current.value
    })
    .then((res) => {
      name.current.value = '';
      email.current.value = '';
      password.current.value = '';
      location.current.value = '';
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
          <label className="form-label">Name</label>
          <input type="text" className="form-control" ref={name} />
        </div>
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
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" ref={location} />
        </div>
        <div className="sbtn text-center">
          <button type="submit" className="btn btn-primary w-100">
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
