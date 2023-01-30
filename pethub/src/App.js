import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import FindShelter from "./pages/FindShelter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import GroupsPage from "./pages/Groupspage";
import PostAPet from "./pages/PostAPetPage";
import FindPetPage from "./pages/FindPetPage";
import LogInPage from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findshelter" element={<FindShelter />} />
          <Route path="/findapet" element={<FindPetPage />} />
          <Route path="/postapet" element={<PostAPet />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/about">About</Link>
    //         </li>
    //         <li>
    //           <Link to="/findpets">Find Pets</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     {/* A <Routes> looks through its children <Route> and
    //         renders the first one that matches the current URL. */}
    //     <Routes>
    //       <Route path="/" element={<Home />} />

    //       <Route path="/about" element={<About />} />

    //       <Route path="/findpets" element={<PetAdoptionPage />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
