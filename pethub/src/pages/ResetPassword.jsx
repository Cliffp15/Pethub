// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
// import "./styles/SignUp.css";

// const ResetPassword = () => {
//   const [datainfo, setDataInfo] = useState({
//     emailAddress: "",
//     userName: "",
//     securityAnswer: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [securityQuestion, setSelected] = useState("");

//   const {
//     emailAddress,
//     userName,
//     securityAnswer,
//     newPassword,
//     confirmPassword,
//   } = datainfo;

//   const questions = [
//     {
//       value: "What is the name of your first pet?",
//       label: "What is the name of your first pet?",
//     },
//     {
//       value: "What city were you born in?",
//       label: "What city were you born in?",
//     },
//     {
//       value: "What was the first concert you attended?",
//       label: "What was the first concert you attended?",
//     },
//     {
//       value: "In what city or town did your parents meet?",
//       label: "In what city or town did your parents meet?",
//     },
//     {
//       value: "What was the make and model of your first car?",
//       label: "What was the make and model of your first car?",
//     },
//   ];

//   const onChange = (e) => {
//     setDataInfo({ ...datainfo, [e.target.name]: e.target.value });
//   };
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       console.log("Passwords do not match");
//       alert("Passwords do not match");
//     } else {
//       const data = {
//         emailAddress: emailAddress,
//         userName: userName,
//         securityAnswer: securityAnswer,
//         securityQuestion: securityQuestion,
//         newPassword: newPassword,
//         confirmPassword: confirmPassword,
//       };

//       try {
//         const response = await axios({
//           method: "post",
//           url: "http://localhost:3001/resetpassword",
//           data: data,
//           headers: { "Content-Type": "application/json" },
//         });

//         if (response.status === 200) {
//           alert("New Password is created! Please sign in with it.");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error(error);
//         console.log(error);
//         alert(error.response.data);
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1>Reset Password Request</h1>
//       <form onSubmit={(e) => onSubmit(e)}>
//         <div className="form-group">
//           <input
//             className="sign-up-input"
//             placeholder="Email"
//             type="text"
//             name="emailAddress"
//             value={emailAddress}
//             onChange={(e) => onChange(e)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             className="sign-up-input"
//             placeholder="Username"
//             type="text"
//             name="userName"
//             value={userName}
//             onChange={(e) => onChange(e)}
//             required
//           />
//         </div>
//         <label>Please Select Your Security Question</label>
//         <div className="form-group">
//           <Select
//             options={questions}
//             name="securityQuestion"
//             onChange={(choice) => setSelected(choice.value)}
//             placeholder="Please select your security question"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             className="sign-up-input"
//             placeholder="Security Answer"
//             type="text"
//             name="securityAnswer"
//             value={securityAnswer}
//             onChange={(e) => onChange(e)}
//             required
//           />
//         </div>
//         <label>New Password</label>
//         <div className="form-group">
//           <input
//             className="sign-up-input"
//             placeholder="Password"
//             type="password"
//             name="newPassword"
//             value={newPassword}
//             onChange={(e) => onChange(e)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             className="sign-up-input"
//             placeholder="Confirm Password"
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => onChange(e)}
//             required
//           />
//         </div>
//         <input type="submit" value="Submit" onClick={onChange} />
//       </form>
//       <p>
//         Need to go back? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };
// export default ResetPassword;

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
            Forgot Password?
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
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
              Submit New Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
