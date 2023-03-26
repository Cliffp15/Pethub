import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/PetHub.png";

function Header({ className }) {
  // Add className prop
  return (
    <header>
      <Link to="/" rel="noreferrer">
        <img src={logo} alt="logo" className={className || "logo"} />
      </Link>
    </header>
  );
}

export default Header;
