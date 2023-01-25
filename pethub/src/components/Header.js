import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/logo.jpg";

function Header() {
  return (
    <header>
      <Link to="/" target="_blank" rel="noreferrer">
        <img src={logo} alt="logo" className="logo" />
      </Link>
    </header>
  );
}

export default Header;
