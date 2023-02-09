import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const { firstName, lastName, email, userName, password, password2, phone, city, state, zip } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
    } else {
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
      if (true) {
        navigate("/");
      } else {
        // Handle authentication error here
        alert("An error occurred. Please try again.");
      }

      axios({
        method: "post",
        url: "http://localhost:3001/signup",
        data: formData,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          alert("User signed up successfully");
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          alert("An error occurred. Please try again.");
        });
    }
  };

  let navigate = useNavigate();

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          {/* <label htmlFor="name">First Name</label> */}
          <input
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
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="email">Email Address</label> */}
          <input
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
            placeholder="Password"
            type="password"
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
            placeholder="Confirm Password"
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            required
            minLength="6"
          />

          <div className="form-group">
            {/* <label htmlFor="phone"> Phone Number</label> */}
            <input
              placeholder="Phone Number"
              type="phone"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="city">City</label> */}
            <input
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
              placeholder="Zip"
              type="text"
              name="zip"
              value={zip}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
        <input type="submit" value="Sign Up" onClick={onChange} />
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
