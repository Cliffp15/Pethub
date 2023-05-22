import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/LogoWhite.png";


// { className }
function Header() {
  // Add className prop
  return (
    <header>
      <Link to="/" rel="noreferrer">
        <img src={logo} alt="logo" className={ "logo"} />
        {/* className || */}
      </Link>
    </header>
  );
}

export default Header;
