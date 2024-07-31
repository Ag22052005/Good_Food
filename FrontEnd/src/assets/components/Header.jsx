import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
function Header() {

  const logoutHandler = ()=>{
    localStorage.clear();
    // localStorage.removeItem('authToken')
  }

  const [active,setActive] = useState('home')

  return (
    
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item" >
                <Link className= {`nav-link  ${active ==='home' ? 'fw-bold':''}`} aria-current="page" to="/"  onClick={()=>setActive('home')}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
              {
                  localStorage.getItem('authToken')?(
                  <Link className={`nav-link ${active ==='myOrders' ? 'fw-bold':''}`} aria-current="page" to="/transaction" onClick={()=>setActive('myOrders')}>
                    My Orders
                  </Link>
                  ):""
                }
              </li>
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="d-flex">
                { active === 'mycart'?"":
                <Link className="btn border mx-1 text-dark fw-bold" to="/mycart" onClick={()=>setActive('mycart')}>
                  My Cart
                </Link>
                }
                <Link className="btn border mx-1 text-danger fw-bold" to="/login" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn border mx-1 fw-bold" to="/login">
                  Login
                </Link>
                <Link className="btn border mx-1 fw-bold" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;
