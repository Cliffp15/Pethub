// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./styles/SignUp.css";
// import Select from "react-select";

// const SignUp = (props) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     userName: "",
//     password: "",
//     password2: "",
//     phone: "",
//     city: "",
//     state: "",
//     zip: "",
//     securityAnswer: "",
//   });

//   const [securityQuestion, setSelected] = useState("");

//   const {
//     firstName,
//     lastName,
//     userName,
//     email,
//     password,
//     password2,
//     phone,
//     city,
//     state,
//     zip,
//     securityAnswer,
//   } = formData;

//   const questions = [
//     { value: "What is the name of your first pet?", label: "What is the name of your first pet?"},
//     { value: "What city were you born in?", label: "What city were you born in?"},
//     { value: "What was the first concert you attended?", label: "What was the first concert you attended?"},
//     { value: "In what city or town did your parents meet?", label: "In what city or town did your parents meet?"},
//     { value: "What was the make and model of your first car?", label: "What was the make and model of your first car?"},
//   ];

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Import axios module
//   const axios = require("axios");

//   // Create a function that runs when the form is submitted
//   const onSubmit = async (e) => {
//     // Prevent the form from submitting
//     e.preventDefault();

//     // Check if the passwords match
//     if (password !== password2) {
//       console.log("Passwords do not match");
//       alert("Passwords do not match");
//     } else {
//       // Create a newUser object with the values from the form
//       const newUser = {
//         firstName,
//         lastName,
//         email,
//         userName,
//         password,
//         phone,
//         city,
//         state,
//         zip,
//         securityQuestion,
//         securityAnswer,
//       };

//       // Use axios to make a POST request to the signup route
//       try {
//         const response = await axios({
//           method: "post",
//           url: "http://localhost:3001/signup",
//           data: newUser,
//           headers: { "Content-Type": "application/json" },
//         });

//         // If the response is successful, redirect to the home page
//         if (response.status === 200) {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error(error);
//         console.log(error);
//         alert(error.response.data);
//       }
//     }
//   };

//   // const port = process.env.PORT || 3001;
//   // app.listen(port, () => {
//   //   console.log(`Server started on port ${port}`);

//   let navigate = useNavigate();

//   return (
//     <div className="form-container">
//       <form onSubmit={(e) => onSubmit(e)}>
//         <div className="form-column">
//           <h1 className="sign-up-text">Sign Up</h1>
//           <div className="form-group">
//             {/* <label htmlFor="name">First Name</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="First Name"
//               type="text"
//               name="firstName"
//               id="firstName2"
//               value={firstName}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="email">Email Address</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Last Name"
//               type="text"
//               name="lastName"
//               id="lName2"
//               value={lastName}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="email">Email Address</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Email"
//               type="text"
//               name="email"
//               value={email}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="email">Email Address</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Username"
//               type="text"
//               name="userName"
//               id="userName2"
//               value={userName}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="password">Password</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Password"
//               type="text"
//               name="password"
//               value={password}
//               onChange={(e) => onChange(e)}
//               required
//               minLength="6"
//             />
//           </div>

//           <div className="form-group">
//             {/* <label htmlFor="password2">Confirm Password</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Confirm Password"
//               type="text"
//               name="password2"
//               value={password2}
//               onChange={(e) => onChange(e)}
//               required
//               minLength="6"
//             />
//           </div>
//         </div>
//         <div className="form-column">
//           <div className="form-group">
//             {/* <label htmlFor="phone"> Phone Number</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Phone Number"
//               type="text"
//               name="phone"
//               value={phone}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="city">City</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="City"
//               type="text"
//               name="city"
//               value={city}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="state">State</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="State"
//               type="text"
//               name="state"
//               value={state}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* <label htmlFor="zip">Zip Code</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Zip"
//               type="text"
//               name="zip"
//               value={zip}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>

//           <label>Security Questions</label>
//           <label>DO NOT FORGET YOUR SECURITY QUESTION! WRITE IT DOWN OR SAVE IT SOMEWHERE!</label>
//           <div className="form-group">
//             {/* <label htmlFor="securityQuestion">Security Question</label> */}
//             <Select
//               options={questions}
//               name="securityQuestion"
//               onChange={(choice) => setSelected(choice.value)}
//               placeholder="Please select a security question"
//               required

//             />
//           </div>
//           <label>DO NOT FORGET YOUR SECURITY ANSWER! WRITE IT DOWN OR SAVE IT SOMEWHERE!</label>
//           <div className="form-group">
//             {/* <label htmlFor="zip">Zip Code</label> */}
//             <input
//               className="sign-up-input"
//               placeholder="Security Answer"
//               type="text"
//               name="securityAnswer"
//               value={securityAnswer}
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>

//           <input
//             className="sign-up-button"
//             type="submit"
//             value="Sign Up"
//             onClick={onChange}
//           />
//         </div>
//       </form>
//       <p>
//         Already have an account? <Link to="/login">Sign In</Link>
//       </p>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PetsIcon from "@mui/icons-material/Pets";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        PetHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(newUser); // add this line
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/signup",
        data: newUser,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#87ceeb" }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#87ceeb" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
