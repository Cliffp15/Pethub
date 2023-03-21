import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cat from "../photos/cat.png";
import "./styles/accountpage.css";
import { useState, useEffect } from "react";
import { City, State } from "country-state-city";
const States = require("us-state-converter");
const Accountpage = () => {
  
  //profileformdata should input users info by default instead of empty string
  const [tempuserName, settempusername] =useState("george");
  const [tempdescription, settempDescription] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [tempphone, settempphone] = useState("4078889999"); 
  const [tempcity, settempcity] =useState("boston");
  const [tempstate, settempstate] = useState("MA");
  const [tempzip, settempzip] = useState("33945");
  
  
  const [formData, setFormData] = useState({
    userName: "",
    description: "",
    photo: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    manage: "",
    password: "",
    password2: "",
  });

  const {
  userName,
  description,
  photo,
  phone,
  city,
  state,
  zip,
  manage,
  password,
  password2,
} = formData;

const handleImageChange = (e) => {

  
  let newImages = [...imageUrl];
    for (let i = 0; i < e.target.files.length; i++) {
      if (newImages.length < 5) {
        newImages.push(URL.createObjectURL(e.target.files[i]));
      }
    }
    setImageUrl(newImages);
};

const updateinfo =()=>{
  if(userName !== ""){settempusername(userName);}
  if(phone !== ""){settempphone(phone);}
  if(city !== ""){settempcity(city);}
  if(state !== ""){settempstate(state);}
  if(zip !== ""){settempzip(zip);}
  if(photo !== ""){setImageUrl(photo);}
  if(description !== ""){settempDescription(description);}
  
    // settempphone(phone);
    // settempcity(city);
    // settempstate(state);
    // settempzip(zip);
  }
  
  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    
    const axios = require("axios");


    // const onSubmit = async (e) => {
    //   // Prevent the form from submitting
    //   e.preventDefault();
  
    //   // Check if the passwords match
    //   if (password !== password2) {
    //     console.log("Passwords do not match");
    //     alert("Passwords do not match");
    //   } else {
    //     // Create a newUser object with the values from the form
    //     const newUser = {
    //       userName,
    //       phone,
    //       city,
    //       state,
    //       zip,
    //     };
  
    //     // Use axios to make a POST request to the signup route
    //     try {
    //       const response = await axios({
    //         method: "post",
    //         url: "http://localhost:3001/signup",
    //         data: newUser,
    //         headers: { "Content-Type": "application/json" },
    //       });
  
    //       // If the response is successful, redirect to the home page
    //       if (response.status === 200) {
    //         navigate("/");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       console.log(error);
    //       alert(error.response.data);
    //     }
    //   }
    // };

    let navigate = useNavigate();
    
  return (
    <div className="Groupspage">
      <div className="Grouppagetitle">
        <h1>Manage Account</h1>
      </div>
      <div className="ExploreGroupsbackground">
        <div className="YourGroupssection">

    <div className="form-container">
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
        <div className="form-column">
          <div className="form-group">
            {/* <label htmlFor="email">Email Address</label> */}
            <h3>Username: {tempuserName}</h3> 
            <input
              className="sign-up-input"
              placeholder="Username"
              id="usernameid"
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
        </div>
        <div className="form-column">
        <div className="form-group">
          <label className="adoption-form-field">
           <h3>Description:</h3> 
            <textarea
              value={tempdescription}
              placeholder="Enter Bio"
              id="description"
              name= "description"
              type= "text"
              onChange={(e) => settempDescription(e.target.value)}
              className="adoption-form-field-textarea"
            ></textarea>
          </label>
          </div>
          <div className="form-group">
            {/* <label htmlFor="phone"> Phone Number</label> */}
            <h3>Phone Number: {tempphone}</h3> 
            <input
              className="sign-up-input"
              id="phonenumber"
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
             <h3>City: {tempcity}</h3> 
            <input
              className="sign-up-input"
              placeholder="City"
              id="cityid"
              type="text"
              name="city"
              value={city}
              onChange={onChange}
              required
            />
          </div>
         
          <div className="form-group">
            {/* <label htmlFor="state">State</label> */}
            <h3>State: {tempstate}</h3> 
            <input
              className="sign-up-input"
              placeholder="State"
              id="stateid"
              type="text"
              name="state"
              value={state}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="zip">Zip Code</label> */}
            <h3>Zip Code: {tempzip}</h3> 
            <input
              className="sign-up-input"
              placeholder="Zip"
              id="zipcodeid"
              type="text"
              name="zip"
              value={zip}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="zip">Zip Code</label> */}
            <h3>Manage Pets</h3> 
            <button>Manage pets</button>
            <input
              className="sign-up-input"
              placeholder="Manage pets youve posted"
              id="Managepetsid"
              type="text"
              name="manage"
              value={manage}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <h3>Profile Photo</h3>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="adoption-form-image-input"
            />
          </div>
          <input
            className="update-button"
            id="updatebuttonid"
            type="submit"
            value="Update Info"
            onClick={updateinfo}
          />
          <input
            className="sign-up-button"
            id="logoutbuttonid"
            type="submit"
            value="Log out"
            onClick={onChange}
          />
        </div>
      {/* </form> */}
    </div>
        </div>
        <div className="ExploreGroupssection">

    <div className="profile-card">
      <div className="profile-card__image" >
        <img src={imageUrl}  />
      </div>
      <div className="profile-card__details">
        <h2 className="profile-card__username">
        <h1>Username:</h1>
          {userName}</h2>
        <h2 className="profile-card__bio">
        <h1>Bio:</h1>
          {tempdescription}
        </h2>
        <h2 className="profile-card__phonenumber">
        <h1>Phone Number:</h1>
          {phone}</h2>
        <h2 className="profile-card__location">
        <span>
          <h1>Location:</h1>
          {city}, {state}
        </span> 
        </h2>
        <h2 className="profile-card__zip">
        <span>
          <h1>Zip:</h1>
          {zip}
        </span> 
        </h2>
        <h2 className="profile-card__Petamount">
          <span> 
            <h1>Pets Posted:</h1>  
            {manage}
          </span>
        </h2>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
  };
export default Accountpage;
