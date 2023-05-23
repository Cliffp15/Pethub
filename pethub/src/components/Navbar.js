import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthContext from "../contexts/AuthContext";
import SignInButton from "../components/SignInButton";
import { Typography } from "@material-ui/core";
import "../pages/styles/Navbar.css";
import SignUpButton from "./SignUpButton";
import { fontSize } from "@material-ui/system";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const CustomLink = ({ to, children }) => (
    <li>
      <Link to={to} className="nav-link">
        {children}
      </Link>
    </li>
  );

  const CustomSignIn = ({ children, handleClickOpen }) => (
    <li>
      <span className="nav-link" onClick={handleClickOpen}>
        {children}
      </span>
    </li>
  );

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
              {/* <<<<<<< HEAD
              <CustomLink  to="/login">Login</CustomLink>
              <CustomLink className="signup-button" to="/signup">Sign up</CustomLink> */}
              {/* ======= */}
              {/* <CustomLink to="/signup">Sign up</CustomLink> */}
              <SignInButton>
                {({ handleClickOpen }) => (
                  <Typography
                    style={{ fontSize: 35, color: "white" }}
                    variant="subtitle1"
                    className="nav-link"
                    onClick={handleClickOpen}
                  >
                    Sign In
                  </Typography>
                )}
              </SignInButton>
              <SignUpButton>
                {({ handleClickOpen }) => (
                  <Typography
                    style={{ fontSize: 35, color: "white" }}
                    variant="subtitle1"
                    className="nav-link"
                    onClick={handleClickOpen}
                  >
                    Sign Up
                  </Typography>
                )}
              </SignUpButton>
              {/* >>>>>>> 1c9f4123a80f3c82bfe1624881c4dc45b2f4d7af */}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   MenuItem,
//   Menu,
//   Box,
//   Typography,
//   Divider,
// } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import { makeStyles } from "@material-ui/core/styles";
// import SignInButton from "../components/SignInButton";
// import Header from "./Header";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     color: "black",
//   },
//   navLinks: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   logo: {
//     margin: "1rem 0 0.5rem 0",
//     maxWidth: "100px",
//     maxHeight: "auto",
//     border: "1px solid black",
//   },
//   logoLink: {
//     textDecoration: "none",
//     display: "inline-block",
//   },
//   authLinks: {
//     display: "flex",
//     alignItems: "center",
//     textDecoration: "none",
//     "& a": {
//       color: "black",
//       textDecoration: "none",
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     },
//   },
//   appBar: {
//     // backgroundColor: "rgba(255, 255, 255, 0.9)",
//     backgroundColor: "rgba(65, 105, 225, 0.4)",
//   },
//   verticalDivider: {
//     backgroundColor: "white",
//     width: "2px",
//     height: "60%",
//     marginLeft: theme.spacing(2),
//     marginRight: theme.spacing(2),
//   },
//   authLink: {
//     color: "black",
//     cursor: "pointer",
//     fontWeight: theme.typography.fontWeightRegular, // Add this line to set the font weight
//   },
//   authLinkSeparator: {
//     color: "white",
//     margin: theme.spacing(0, 1),
//   },
//   squareIconButton: {
//     borderRadius: 0, // To make it a square shape
//   },
//   menuIcon: {
//     color: "black",
//   },
// }));

// function Navbar() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClick = (event) => {
//     setMenuAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" className={classes.appBar}>
//         <Toolbar>
//           <Link to="/" className={classes.logoLink}>
//             <Header className={classes.logo} />
//           </Link>

//           <Box className={classes.verticalDivider}></Box>

//           <IconButton
//             color="inherit"
//             onClick={handleMenuClick}
//             className={classes.squareIconButton}
//           >
//             <Box display="flex" alignItems="center">
//               <MenuIcon className={classes.menuIcon} />
//               <Typography className={classes.menuIcon} variant="subtitle1">
//                 Menu
//               </Typography>
//             </Box>
//           </IconButton>
//           <Menu
//             anchorEl={menuAnchorEl}
//             keepMounted
//             open={Boolean(menuAnchorEl)}
//             onClose={handleMenuClose}
//             className={classes.menu}
//           >
//             {" "}
//             <MenuItem component={Link} to="/findapet" onClick={handleMenuClose}>
//               Find Pets
//             </MenuItem>
//             <MenuItem
//               component={Link}
//               to="/findshelter"
//               onClick={handleMenuClose}
//             >
//               Find Shelter
//             </MenuItem>
//             <MenuItem component={Link} to="/postapet" onClick={handleMenuClose}>
//               Post A Pet
//             </MenuItem>
//             <MenuItem component={Link} to="/groups" onClick={handleMenuClose}>
//               Groups
//             </MenuItem>
//             <MenuItem component={Link} to="/signedin" onClick={handleMenuClose}>
//               Signedin
//             </MenuItem>
//           </Menu>

//           <Box flexGrow={1}></Box>

//           <Box className={classes.authLinks}>
//             <SignInButton className={classes.authLink} />
//             <Typography
//               variant="subtitle1"
//               className={classes.authLinkSeparator}
//             >
//               /
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               component={Link} // Use the "component" prop to render the Typography as a Link
//               to="/signup"
//               className={classes.authLink} // Apply the authLink class
//             >
//               Sign up
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default Navbar;

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
