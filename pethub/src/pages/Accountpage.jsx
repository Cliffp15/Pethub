import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cat from "../photos/cat.png";
import dog from "../photos/dog.png";
import fish from "../photos/fish.png";
import snake from "../photos/snake.png";
import nicecat from "../photos/smilingcaticon.png";
import shiba from "../photos/shiba.png";
import cattoy from "../photos/cattoy.png";
import "./styles/accountpage.css";
// import "./styles/GroupBanners.css";
import { useState, useEffect } from "react";
import GroupCard from "../components/Groups";
import GroupBannerCard from "../components/GroupsBanners";
import PetCard from "../components/PetImageSelection";


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
      description: "The best place for reptiles from all over!",
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
  title: "Username", 
  description: "Playground's for feline pals!",
  photos: `${cattoy}`,
  },
  // {
  //     title: "Profile Picture", 
  //     description: "Collections of cool canines!",
  //     photos: `${shiba}`,
  // },
  // {
  //     title: "Phone Number", 
  //     description: "Collections of cool canines!",
  //     photos: `${shiba}`,
  // },
  {
      title: "Location", 
      description: "Collections of cool canines!",
      photos: `${shiba}`,
  },
  { 
      title: "Manage list of pets you posted", 
      description: "Cats that just want to !",
      photos: `${nicecat}`,
  }
]

const imgURL = {cat};




// Add scrollable feature to the list for "your groups" and "explorable groups"
const Accountpage = () => {
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const axios = require("axios");


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
          userName,
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

    let navigate = useNavigate();
    
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



  return (
    <div className="Groupspage">
      <div className="Grouppagetitle">
        <h1>Manage Account</h1>
      </div>
      <div className="ExploreGroupsbackground">
          <div className="YourGroupssection">
            {/* <div className="YourgroupsTitlesection">
              <h1>Manage Account</h1>
            </div> */}
            {/* <div className="YourGroupslist">

            {/* //Turning these into functions later using
            //arraydata(groupsampledata) to map over,
            //component(GroupBannerCard), 
            //and property(GroupBannerinfo)
            // as parameters */}
            {/* {groupsampledata?.length > 0 ? (
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
            </div> } */}
            

    <div className="form-container">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-column">
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
          <div className="form-group">
            {/* <label htmlFor="zip">Zip Code</label> */}
            <input
              className="sign-up-input"
              placeholder="Manage pets youve posted"
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
            value="Log out"
            onClick={onChange}
          />
        </div>
      </form>
    </div>
        </div>
      
        <div className="ExploreGroupssection">

    <div className="profile-card">
      <div className="profile-card__image" >
        <img src={cat}  />
      </div>
      <div className="profile-card__details">
        <h2 className="profile-card__username">
        <h1>Username:</h1>
          Cat lover123</h2>
        <h2 className="profile-card__bio">
        <h1>Bio:</h1>
          I am a cat owner that love tabby's.
          Dogs suck.
        </h2>
        <h2 className="profile-card__phonenumber">
        <h1>Phone Number:</h1>
          1234567890</h2>
        <h2 className="profile-card__location">
        <span>
          <h1>Location:</h1>
          Winston, GA
        </span> 
        </h2>
        <h2 className="profile-card__Petamount">
          <span> 
            <h1>Pets Posted:</h1>  
            4 pets posted
          </span>
        </h2>
      </div>
    </div>



          {/* <div className="ExploreGroupslist"> */}

          {/* //Turning these into functions using
            //arraydata(groupsampledata) to map over,
            //component(GroupCard), 
            //and property(GroupBannerinfo)
            // as parameters */}
                  {/* {groupsampledata?.length > 0 ? (
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
          </div> */}

        </div>
      </div>
    </div>
  );
  };
export default Accountpage;
