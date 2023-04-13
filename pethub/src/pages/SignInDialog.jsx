import * as React from "react";
import { useState } from "react";

import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PetsIcon from "@mui/icons-material/Pets";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignInDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ... rest of the SignIn component logic ...
  //useNavigate is a hook that allows you to navigate from one page to another.
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevent the default form submission behavior
    e.preventDefault();

    // create the data object to send to the server
    const data = {
      email: email,
      password: password,
    };

    // send the data to the server
    axios({
      method: "post",
      url: "http://localhost:3001/signindialog",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        // handle the response from the server
        console.log(response);
        localStorage.setItem("userId", response.data.userId);
        alert("User logged in successfully");
        navigate("/");
      })
      .catch(function (response) {
        // handle an error from the server
        console.log(response);
        alert(response.response.data);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>
          <Avatar sx={{ bgcolor: "#87ceeb", mx: "auto", mt: 2 }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Sign in
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CssBaseline />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#87ceeb", opacity: 0.8 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => {
                    onClose();
                    setTimeout(() => navigate("/resetpassword"), 100);
                  }}
                  variant="body2"
                  style={{ cursor: "pointer", color: "#87ceeb" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    onClose();
                    setTimeout(() => navigate("/signup"), 100);
                  }}
                  variant="body2"
                  style={{ cursor: "pointer", color: "#87ceeb" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            {/* ... rest of the form elements ... */}
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
