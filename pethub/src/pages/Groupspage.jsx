import React from "react";
import cat from "../photos/cat.png";
import dog from "../photos/dog.png";
import fish from "../photos/fish.png";
import snake from "../photos/snake.png";
import nicecat from "../photos/smilingcaticon.png";
import shiba from "../photos/shiba.png";
import cattoy from "../photos/cattoy.png";
import "./styles/Groups.css";
import "./styles/GroupBanners.css";
import { useState, useEffect } from "react";
import GroupCard from "../components/Groups";
import GroupBannerCard from "../components/GroupsBanners";

//Need to use database info instead in future
const groupsampledata = [
  {
  title: "Cute Kitten Club", 
  description: "A place where all cute kittens from across the world!",
  photos: `${cat}`,
  },
  {
      title: "Canine Crew", 
      description: "Collections of cool canines!",
      photos: `${dog}`,
  },
  { 
      title: "Reptilian Regiment", 
      description: "The best place to reptiles from all over!",
      photos: `${snake}`, 
  },
  { 
      title: "Golden Guppies", 
      description: "Glorious golden guppies!",
      photos: `${fish}`,
  }
]

const groupbannersampledata = [
  {
  title: "Cat Toy Corner", 
  description: "Playground's for feline pals!",
  photos: `${cattoy}`,
  },
  {
      title: "Shiba Sanctuary", 
      description: "Collections of cool canines!",
      photos: `${shiba}`,
  },
  { 
      title: "Kind Kittens", 
      description: "Cats that just want to !",
      photos: `${nicecat}`,
  }
]
// Add scrollable feature to the list for "your groups" and "explorable groups"
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

            {/* //Turning these into functions later using
            //arraydata(groupsampledata) to map over,
            //component(GroupBannerCard), 
            //and property(GroupBannerCard)
            // as parameters */}
            {groupsampledata?.length > 0 ? (
                <div className="groupbannercardcontainer">
                  {groupbannersampledata.map((groupbannerinfo, index) => (
                    <GroupBannerCard key={index} groupbannerinfo={groupbannerinfo} />
                  ))}
                </div>
              ) : (
                <div className="emptybanners">
                  <h2>
                    {" "}
                    <span>
                      No groups found.
                    </span>{" "}
                  </h2>
                </div>
              )}
            </div>
        </div>
      
        <div className="ExploreGroupssection">
          <div className="ExploreGroupslist">

          {/* //Turning these into functions using
            //arraydata(groupsampledata) to map over,
            //component(GroupBannerCard), 
            //and property(GroupBannerCard)
            // as parameters */}
                  {groupsampledata?.length > 0 ? (
                <div className="groupcardcontainer">
                  {groupsampledata.map((groupinfo, index) => (
                    <GroupCard key={index} groupinfo={groupinfo} />
                  ))}
                </div>
              ) : (
                <div className="emptygroupcards">
                  <h2>
                    {" "}
                    <span>
                      No groups found.
                    </span>{" "}
                  </h2>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
  };
export default GroupsPage;