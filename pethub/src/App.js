import React, { useEffect,createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";


import FindShelter from "./pages/FindShelter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PostAPet from "./pages/PostAPetPage";
import FindPetPage from "./pages/FindPetPage";
import SignIn from "./pages/SignIn";
import LogInPage from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Accountpage from "./pages/Accountpage";
import PetDetails from "./pages/PetDetails";
import Footer from "./components/Footer";
import ResetPassword from "./pages/ResetPassword";
import AuthContext from "./contexts/AuthContext";

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  ); 
  
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
    <AuthContext.Provider
        value={{ isAuthenticated: isAuthenticated, handleLogin: handleLogin, logout: logout }}
      >
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/component/:id" element={<PetDetails />} />
        <Route path="/findshelter" element={<FindShelter />} />
        <Route path="/findapet" element={<FindPetPage />} />
        {isAuthenticated && (
          <>
            <Route path="/signedin" element={<Accountpage />} />
            <Route path="/postapet" element={<PostAPet />} />
          </>
        )}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<LogInPage handleLogin={handleLogin}/>}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </>
        )}
      </Routes>
      <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
