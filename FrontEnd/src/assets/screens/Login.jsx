import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/signup");
  };

  const isEmailcorrect = () => {
    const em = email.current.value;
    let aindex = em.lastIndexOf("@");
    let dindex = em.lastIndexOf(".");
    if (aindex === -1 || dindex === -1 || aindex > dindex) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const em = document.getElementById("emailcheck");
    const ps = document.getElementById("passcheck");
    if (email.current.value === "") {
      em.textContent = "*required";
      em.style.display = "block";
      return;
    } else {
      em.style.display = "none";
    }
    if (password.current.value === "") {
      ps.textContent = "*required";
      ps.style.display = "block";
      return;
    } else {
      ps.style.display = "none";
    }

    if (!isEmailcorrect()) {
      em.textContent = "*Invalid Email";
      em.style.display = "block";
      return;
    } else {
      em.style.display = "none";
    }

    axios
      .post(`${import.meta.env.VITE_HOST_URL}/login`, {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("authToken", res.data.authToken);
        
        toast("Logged In Successfull", {
          position: "top-center",
          type: "success",
          autoClose: 1000,
        });
        setTimeout(() => {
          email.current.value = "";
          password.current.value = "";
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        if(err.response.data !==""){
          const msg = err.response.data.errmsg;
          console.log("error msg", msg);
          if (msg === "User Not Found") {
            em.textContent = "*User Not Found";
            em.style.display = "block";
          } else if (msg === "Password is Incorrect") {
            ps.textContent = "*Incorrect password";
            ps.style.display = "block";
          }
        } else {
          alert("Internal server Error");
        }
      });
  };

  return (
    <div className="container mt-5 border border-secondary p-5 rounded sbox">
      <ToastContainer className='loginToast'/>
      <div className="shead">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={email}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <p className="text-danger" id="emailcheck">
            *Invalid Email
          </p>
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
          <p className="text-danger" id="passcheck">
            *Invalid password
          </p>
        </div>
        <div className="lbtn text-center">
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </div>
      </form>
      <div className="isuser text-center mt-2 mb-1 w-100">
        <h6>Not a user?</h6>
      </div>
      <div className="sbtn text-center">
        <button className="btn btn-primary w-100" onClick={handleRedirect}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
