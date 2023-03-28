import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/Logo-All-White.png";

function Header() {
  return (
    // header component returning the logo of the website
    <header>
      <Link to="/" rel="noreferrer">
        <img src={logo} alt="logo" className="logo" />
      </Link>
    </header>
  );
}

export default Header;
