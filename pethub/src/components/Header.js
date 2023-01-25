import React from "react";

import logo from "../photos/logo.jpg";

function Header() {
  return (
    <header>
      <img src={logo} alt="logo" className="logo" />
    </header>
  );
}

export default Header;
