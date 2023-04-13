import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./styles/Login.css";
import caticon from "../photos/cat.png";

const LogInPage = ({ handleLogin }) => {
  //useState is a hook that allows you to have state variables in functional components.
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //useNavigate is a hook that allows you to navigate from one page to another.
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevent the default form submission behavior
    e.preventDefault();

    // create the data object to send to the server
    const data = {
      userName: userName,
      password: password,
    };

    // send the data to the server
    axios({
      method: "post",
      url: "http://localhost:3001/login",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        // handle the response from the server
        console.log(response);

        handleLogin(response.data.token);

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
    <div className="container">
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formInput">
          <p className="login-text">Log in</p>
          <input
            className="formInputLogin"
            placeholder="User Name"
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="formInputLogin"
            placeholder="Password"
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="formButton">
          <img src={caticon} alt="dog icon" className="cat-icon" />
          Login
          <img src={caticon} alt="dog icon" className="cat-icon" />
        </button>

        <p>
          Need to Create an Account? <Link to="/signup">Sign Up</Link>
        </p>

        <p>
          Forgot your Password? <Link to="/resetpassword">Reset Password</Link>
        </p>
      </form>
    </div>
  );
};
export default LogInPage;
