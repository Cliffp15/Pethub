import React from "react";
import HeroImage from "../photos/HeroImage.png";
import caticon from "../photos/cat.png";
import kitten from "../photos/kitten.jpg";
import heart from "../photos/heart.png";
import "./styles/Groups.css";
import { useState, useEffect } from "react";

// import heart from "../photos/heart.png"
import GroupCard from "../components/Groups";

const GroupsPage = () => {
  return (
    <div className="Groupspage">
      <div className="Grouppagetitle">
        <h1>Explore Groups</h1>
      </div>
      <div className="ExploreGroupsbackground">
        <div className="YourGroupssection">
            <div className="YourgroupsTitlesection">
              <h1>Your Groups</h1>
            </div>
            <div className="YourGroupslist">
              <GroupCard></GroupCard>
              <GroupCard></GroupCard>
              <GroupCard></GroupCard>
            </div>
        </div>
      
        <div className="ExploreGroupssection">
            <div className="ExploreGroupslist">
              <GroupCard></GroupCard>
              <GroupCard></GroupCard>
              <GroupCard></GroupCard>
            </div>
        </div>
      </div>
    </div>
  );
  };
export default GroupsPage;