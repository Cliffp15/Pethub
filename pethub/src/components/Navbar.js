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
  IconButton,
  MenuItem,
  Menu,
  Box,
  Typography,
  Divider,
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
  navLinks: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    margin: "1rem 0 0.5rem 0",
    maxWidth: "100px",
    maxHeight: "auto",
  },
  logoLink: {
    textDecoration: "none",
    display: "inline-block",
  },
  authLinks: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    "& a": {
      color: "white",
      textDecoration: "none",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  appBar: {
    backgroundColor: "#4169e1",
  },
  verticalDivider: {
    backgroundColor: "white",
    width: "2px",
    height: "60%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  authLink: {
    color: "white",
    cursor: "pointer",
    fontWeight: theme.typography.fontWeightRegular, // Add this line to set the font weight
  },
  authLinkSeparator: {
    color: "white",
    margin: theme.spacing(0, 1),
  },
  squareIconButton: {
    borderRadius: 0, // To make it a square shape
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
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.logoLink}>
            <Header className={classes.logo} />
          </Link>

          <Box className={classes.verticalDivider}></Box>

          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            className={classes.squareIconButton}
          >
            <Box display="flex" alignItems="center">
              <MenuIcon />
              <Typography variant="subtitle1">Menu</Typography>
            </Box>
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            {" "}
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

          <Box flexGrow={1}></Box>

          <Box className={classes.authLinks}>
            <SignInButton className={classes.authLink} />
            <Typography
              variant="subtitle1"
              className={classes.authLinkSeparator}
            >
              /
            </Typography>
            <Typography
              variant="subtitle1"
              component={Link} // Use the "component" prop to render the Typography as a Link
              to="/signup"
              className={classes.authLink} // Apply the authLink class
            >
              Sign up
            </Typography>
          </Box>
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
