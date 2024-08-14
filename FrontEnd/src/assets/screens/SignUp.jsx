import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    const mymap = {
      0: "name",
      1: "email",
      2: "password",
      3: "location",
      4: "mobile",
    };
    const Values = [
      name.current.value,
      email.current.value,
      password.current.value,
      location.current.value,
      mobile.current.value,
    ];

    const nameP = document.getElementById("name");
    const emailP = document.getElementById("email");
    const passwordP = document.getElementById("password");
    const locationP = document.getElementById("location");
    const mobileP = document.getElementById("mobile");
    let flag = false;
    Values.forEach((val, index) => {
      if (val === "") {
        flag = true;
        document.getElementById(`${mymap[index]}`).style.display = "block";
      } else {
        document.getElementById(`${mymap[index]}`).style.display = "none";
      }
    });
    if (flag) {
      return;
    }

    if (
      mobile.current.value.length !== 10 ||
      !isNumeric(mobile.current.value)
    ) {
      toast.error("Invalid Phone Number", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    axios
      .post(`${import.meta.env.VITE_HOST_URL}/signup`, {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        location: location.current.value,
        mobile: mobile.current.value,
      })
      .then((res) => {
        toast("Account Created Successfully", {
          position: "top-center",
          type: "success",
          autoClose: 1000,
        });
        setTimeout(() => {
          name.current.value = "";
          email.current.value = "";
          password.current.value = "";
          location.current.value = "";
          mobile.current.value = "";
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data.status);
        if (err.response.data.status === "err") {
          // console.log("hiiiiiiiiiiiiii")
          err.response.data.errors.forEach((errobj) => {
            const ptag = document.getElementById(`${errobj.path}`);
            ptag.textContent = errobj.msg;
            ptag.style.display = "block";
          });
        } else {
          console.log(err);
          if (err.response.data.status === "user exists") {
            toast.error("Email is already used", {
              position: "top-center",
              autoClose: 2000,
            });
          } else {
            toast.error("Internal server Error");
          }
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5 border border-secondary p-5 sbox rounded">
        <div className="shead">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <b>Name</b>
            </label>
            <input
              type="text"
              className="form-control"
              ref={name}
              placeholder="Enter your name"
            />
            <p style={{ color: "red" }} id="name" className="errmsg">
              *required
            </p>
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
            <p style={{ color: "red" }} id="email" className="errmsg">
              *required
            </p>
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
            <p style={{ color: "red" }} id="password" className="errmsg">
              *required
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Mobile</b>{" "}
            </label>
            <input
              type="text"
              className="form-control "
              ref={mobile}
              placeholder="Enter your mobile number"
            />
            <p style={{ color: "red" }} id="mobile" className="errmsg">
              *required
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <b>Location</b>
            </label>
            <input
              type="text"
              className="form-control"
              ref={location}
              placeholder="Enter your location"
            />
            <p style={{ color: "red" }} id="location" className="errmsg">
              *required
            </p>
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
    </>
  );
}

export default SignUp;
