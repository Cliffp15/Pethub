import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("button was pressed");

    e.preventDefault();

    const data = {
      userName: userName,
      password: password,
    };

    axios({
      method: "post",
      url: "http://localhost:3001/login",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("User logged in successfully");
        navigate("/");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        // alert("An error occurred. Please try again.");
      });
  };
  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <div className="formInput">
        <input
          placeholder="User Name"
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Password"
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="formButton">
        Login
      </button>
    </form>
  );
};
export default LogInPage;
