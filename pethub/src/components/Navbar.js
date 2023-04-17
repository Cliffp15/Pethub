import { useImperativeHandle, useContext} from "react";
import { Link, useMatch, useResolvedPath, } from "react-router-dom";
import Header from "./Header";
import AuthContext from "../contexts/AuthContext";

import "../pages/styles/Navbar.css";
export default function Navbar() {
  const { isAuthenticated, logout, } = useContext(AuthContext);
  return (
    <div className="header-nav">
      <nav className="nav">
        <Header className="logo" />
        <ul className="nav-links">
          {isAuthenticated && (
            <>
              <CustomLink to="/findapet">Find Pets</CustomLink>
              <CustomLink to="/findshelter">Find Shelter</CustomLink>
              <CustomLink to="/postapet">Post A Pet</CustomLink>
              <CustomLink to="/signedin">Account</CustomLink>
              <button onClick={logout}>Logout</button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <CustomLink to="/findapet">Find Pets</CustomLink>
              <CustomLink to="/findshelter">Find Shelter</CustomLink>
              <CustomLink  to="/login">Login</CustomLink>
              <CustomLink className="signup-button" to="/signup">Sign up</CustomLink>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
