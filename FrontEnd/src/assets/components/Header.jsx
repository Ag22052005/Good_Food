import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { UserDetailsToggleButton } from "../../Context/UserDetailsContext";
function Header() {
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
  };

  const [active, setActive] = useState("home");
  const {userDetailsToggle,setUserDetailsToggle} = useContext(UserDetailsToggleButton)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            EatSure
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
              <li className="nav-item">
                <Link
                  className={`nav-link ${active === "home" ? "fw-bolder" : ""}`}
                  aria-current="page"
                  to="/"
                  onClick={() => setActive("home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem("authToken") ? (
                  <Link
                    className={`nav-link ${active === "myOrders" ? "fw-bolder" : ""}`}
                    aria-current="page"
                    to="/transaction"
                    onClick={() => setActive("myOrders")}
                  >
                    My Orders
                  </Link>
                ) : null}
              </li>
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="m-2 w-auto d-flex align-items-center">
                <div className="d-flex">
                  {active === "mycart" ? null : (
                    <Link
                      className="btn"
                      to="/mycart"
                      onClick={() => setActive("mycart")}
                    >
                      <LiaCartArrowDownSolid style={{fontWeight:'bolder',fontSize:'2rem',cursor:'pointer'}}/>
                    </Link>
                  )}
                </div>
                <div className="dropdown mx-2 ">
    
                    <CgProfile className="dropdown-toggle fs-4" style={{cursor:'pointer'}}
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"/>
                  <ul className="dropdown-menu dropdown-list" aria-labelledby="dropdownMenuButton" >
                    <li><Link className="dropdown-item" to={"/userdetails/profile"} onClick={()=>{setUserDetailsToggle('profile')}}>Profile</Link></li>
                    <li><Link className="dropdown-item" to={"/userdetails/orders"} onClick={()=>{setUserDetailsToggle('orders')}}>Orders</Link></li>
                    <li><Link className="dropdown-item" to={"/userdetails/cart"} onClick={()=>{setUserDetailsToggle('cart')}}>Cart</Link></li>
                    <li><Link className="dropdown-item" to={"/userdetails/fav"} onClick={()=>{setUserDetailsToggle('fav')}}>Favourites</Link></li>
                    <li><Link className="dropdown-item" onClick={logoutHandler} to={"/"}>LogOut</Link></li>
                  </ul>
                </div>
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
    </div>
  );
}

export default Header;
