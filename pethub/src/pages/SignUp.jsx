import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/SignUp.css";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    password2: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
  });

  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    password2,
    phone,
    city,
    state,
    zip,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Import axios module
  const axios = require("axios");

  // Create a function that runs when the form is submitted
  const onSubmit = async (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Check if the passwords match
    if (password !== password2) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
    } else {
      // Create a newUser object with the values from the form
      const newUser = {
        firstName,
        lastName,
        email,
        userName,
        password,
        phone,
        city,
        state,
        zip,
      };

      // Use axios to make a POST request to the signup route
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:3001/signup",
          data: newUser,
          headers: { "Content-Type": "application/json" },
        });

        // If the response is successful, redirect to the home page
        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        console.log(error);
        alert(error.response.data);
      }
    }
  };

  // const port = process.env.PORT || 3001;
  // app.listen(port, () => {
  //   console.log(`Server started on port ${port}`);

  let navigate = useNavigate();

  return (
    <div className="form-container">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-column">
          <h1 className="sign-up-text">Sign Up</h1>
          <div className="form-group">
            {/* <label htmlFor="name">First Name</label> */}
            <input
              className="sign-up-input"
              placeholder="First Name"
              type="text"
              name="firstName"
              id="firstName2"
              value={firstName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="email">Email Address</label> */}
            <input
              className="sign-up-input"
              placeholder="Last Name"
              type="text"
              name="lastName"
              id="lName2"
              value={lastName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="email">Email Address</label> */}
            <input
              className="sign-up-input"
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="email">Email Address</label> */}
            <input
              className="sign-up-input"
              placeholder="Username"
              type="text"
              name="userName"
              id="userName2"
              value={userName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              className="sign-up-input"
              placeholder="Password"
              type="text"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            {/* <label htmlFor="password2">Confirm Password</label> */}
            <input
              className="sign-up-input"
              placeholder="Confirm Password"
              type="text"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              required
              minLength="6"
            />
          </div>
        </div>
        <div className="form-column">
          <div className="form-group">
            {/* <label htmlFor="phone"> Phone Number</label> */}
            <input
              className="sign-up-input"
              placeholder="Phone Number"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="city">City</label> */}
            <input
              className="sign-up-input"
              placeholder="City"
              type="text"
              name="city"
              value={city}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="state">State</label> */}
            <input
              className="sign-up-input"
              placeholder="State"
              type="text"
              name="state"
              value={state}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="zip">Zip Code</label> */}
            <input
              className="sign-up-input"
              placeholder="Zip"
              type="text"
              name="zip"
              value={zip}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <input
            className="sign-up-button"
            type="submit"
            value="Sign Up"
            onClick={onChange}
          />
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
