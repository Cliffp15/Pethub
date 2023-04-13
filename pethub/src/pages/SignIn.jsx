// import * as React from "react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import PetsIcon from "@mui/icons-material/Pets";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";

// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "./styles/Login.css";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="/">
//         PetHub
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function SignIn() {
//   //useState is a hook that allows you to have state variables in functional components.
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   //useNavigate is a hook that allows you to navigate from one page to another.
//   const navigate = useNavigate();

//   const handleLinkClick = (event, to) => {
//     event.preventDefault();
//     setTimeout(() => {
//       navigate(to);
//     }, 100);
//   };

//   const handleSubmit = (e) => {
//     // prevent the default form submission behavior
//     e.preventDefault();

//     // create the data object to send to the server
//     const data = {
//       userName: userName,
//       password: password,
//     };

//     // send the data to the server
//     axios({
//       method: "post",
//       url: "http://localhost:3001/login",
//       data: data,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then(function (response) {
//         // handle the response from the server
//         console.log(response);
//         localStorage.setItem("userId", response.data.userId);
//         alert("User logged in successfully");
//         navigate("/");
//       })
//       .catch(function (response) {
//         // handle an error from the server
//         console.log(response);
//         alert(response.response.data);
//       });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "#87ceeb" }}>
//             <PetsIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link
//                   component={RouterLink}
//                   to="/resetpassword"
//                   variant="body2"
//                   onClick={(event) => handleLinkClick(event, "/resetpassword")}
//                 >
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link
//                   component={RouterLink}
//                   to="/signup"
//                   variant="body2"
//                   onClick={(event) => handleLinkClick(event, "/signup")}
//                 >
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
