import { useImperativeHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Header from "./components/Header";
export default function Navbar() {
  return (
    <div className="header-nav">
      <Header />
      <nav className="nav">
        {/* The Link component is the react version of href */}

        {/* <Link to="/" className="site-title">
          PetHub
        </Link> */}
        <ul>
          {/* Creating a component CustomLink which I am passing in props to the correct page */}
          <CustomLink to="/findapet">Find Pets</CustomLink>
          <CustomLink to="/findshelter">Find Shelter</CustomLink>
          <CustomLink to="/postapet">Post A Pet</CustomLink>
          <CustomLink to="/groups">Groups</CustomLink>
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
