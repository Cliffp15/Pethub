// import { useImperativeHandle } from "react";
// import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import Header from "./Header";
// import SignInButton from "../components/SignInButton";

// import "../pages/styles/Navbar.css";
// export default function Navbar() {
//   return (
//     <div className="header-nav">
//       <nav className="nav">
//         <Header className="logo" />
//         {/* The Link component is the react version of href */}
//         <ul className="nav-links">
//           {/* Creating a component CustomLink which I am passing in props to the correct page */}
//           <CustomLink to="/findapet">Find Pets</CustomLink>
//           <CustomLink to="/findshelter">Find Shelter</CustomLink>
//           <CustomLink to="/postapet">Post A Pet</CustomLink>
//           <CustomLink to="/groups">Groups</CustomLink>
//           <CustomLink to="/signedin">Signedin</CustomLink>
//           <SignInButton />
//           <div className="signup-login">
//             <CustomLink to="/signup">Sign up</CustomLink>

//             <span className="slash">/</span>
//             <CustomLink to="/login">Login</CustomLink>
//           </div>
//           {/* <CustomLink to="/signuptest">Sign up Test</CustomLink> */}
//         </ul>
//       </nav>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import SignInButton from "../components/SignInButton";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    margin: "1rem 0 0 0",
    maxWidth: "100px", // Adjust the width as desired
    maxHeight: "auto", // Adjust the height as desired
  },
  logoLink: {
    textDecoration: "none",
    display: "inline-block", // Add this to remove any extra space around the logo
  },
}));

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.logoLink}>
              <Header className={classes.logo} />
            </Link>
          </Typography>

          <IconButton color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
            <Typography variant="subtitle1">Menu</Typography>
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/findapet" onClick={handleMenuClose}>
              Find Pets
            </MenuItem>
            <MenuItem
              component={Link}
              to="/findshelter"
              onClick={handleMenuClose}
            >
              Find Shelter
            </MenuItem>
            <MenuItem component={Link} to="/postapet" onClick={handleMenuClose}>
              Post A Pet
            </MenuItem>
            <MenuItem component={Link} to="/groups" onClick={handleMenuClose}>
              Groups
            </MenuItem>
            <MenuItem component={Link} to="/signedin" onClick={handleMenuClose}>
              Signedin
            </MenuItem>
          </Menu>
          <SignInButton />
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }
