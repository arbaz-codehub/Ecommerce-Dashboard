// import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const Nav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const auth = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="header">
      <img src={Logo} alt="myLogo" />
      {auth ? (
        <ul className="nav-bar">
          <li>
            <Link to="/" className={isActive("/") ? "active-link" : ""}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/add" className={isActive("/add") ? "active-link" : ""}>
              Add Products
            </Link>
          </li>
          {/* <li>
            <Link
              to="/update"
              className={isActive("/update") ? "active-link" : ""}
            >
              Update Products
            </Link>
          </li> */}
          <li>
            <Link
              to="/profile"
              className={isActive("/profile") ? "active-link" : ""}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              to="/signup"
              className={isActive("/logout") ? "active-link" : ""}
            >
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-bar nav-right">
          <li>
            <Link
              to="/signup"
              className={isActive("/signup") ? "active-link" : ""}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={isActive("/login") ? "active-link" : ""}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
