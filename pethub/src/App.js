import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { createContext, useState } from "react";
import FindShelter from "./pages/FindShelter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import GroupsPage from "./pages/Groupspage";
import PostAPet from "./pages/PostAPetPage";
import FindPetPage from "./pages/FindPetPage";
import LogInPage from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Accountpage from "./pages/Accountpage";
import PetDetails from "./pages/PetDetails";
export const UserContext = createContext();

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/component/:id" element={<PetDetails />} />
        <Route path="/findshelter" element={<FindShelter />} />
        <Route path="/signedin" element={<Accountpage />} />
        <Route path="/findapet" element={<FindPetPage />} />
        <Route path="/postapet" element={<PostAPet />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
