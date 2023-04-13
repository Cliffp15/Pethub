import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cat from "../photos/cat.png";
import "./styles/accountpage.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Accountpage = () => {
  //profileformdata should input users info by default instead of empty string
  const [tempuserName, settempusername] = useState("");
  const [tempdescription, settempDescription] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [tempphone, settempphone] = useState("");
  const [tempcity, settempcity] = useState("");
  const [tempstate, settempstate] = useState("");
  const [tempzip, settempzip] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const data = {
    userId: userId,
  };

  axios({
    method: "post",
    url: "http://localhost:3001/users",
    data: data,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      // handle the response from the server
      console.log(response);
      settempusername(response.data.userName);
      settempzip(response.data.zip);
      settempphone(response.data.phone);
      // setImageUrl(response.data.profilePicture);
    })
    .catch(function (response) {
      // handle an error from the server
      console.log(response);
      // alert("An error occurred. Please try again.");
    });

  const [formData, setFormData] = useState({
    userName: "",
    // description: "",
    photo: "",
    phone: "",
    // city: "",
    // state: "",
    zip: "",
    userId: userId,
  });

  const {
    userName,
    // description,
    photo,
    phone,
    // city,
    // state,
    zip,
  } = formData;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    console.log(imageUrl);
  };

  const updateinfo = () => {
    if (userName !== "") {
      settempusername(userName);
    }
    if (phone !== "") {
      settempphone(phone);
    }
    // if(city !== ""){settempcity(city);}
    // if(state !== ""){settempstate(state);}
    if (zip !== "") {
      settempzip(zip);
    }
    if (photo !== "") {
      setImageUrl(photo);
    }
    // if(description !== ""){settempDescription(description);}

    // settempphone(phone);
    // settempcity(city);
    // settempstate(state);
    // settempzip(zip);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Create a newUser object with the values from the form
    const updatedUser = {
      userName,
      phone,
      zip,
      photo,
      userId,
    };

    // Use axios to make a POST request to the update route
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/updateUser",
        data: updatedUser,
        headers: { "Content-Type": "application/json" },
      });

      // If the response is successful, redirect to the home page
      if (response.status === 200) {
      }
    } catch (error) {
      console.error(error);
      console.log(error);
      alert(error.response.data);
    }
  };

  // let navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("token"); // remove the token from local storage
    navigate("/"); // navigate the user to the home page
  };

  return (
    <div className="Groupspage">
      <div className="Grouppagetitle">
        <h1>Manage Account</h1>
      </div>
      <div className="ExploreGroupsbackground">
        <div className="YourGroupssection">
          <div className="form-container">
            <form onSubmit={(e) => onSubmit(e)}>
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
                {/* <div className="form-group">
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
          </div> */}
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

                {/* <div className="form-group">
            
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
          </div> */}

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
                {/* <div className="form-group">
            
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
          </div> */}
                <div className="form-group">
                  <h3>Profile Photo</h3>
                  <input
                    type="file"
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
                {/* <input
                  className="sign-up-button"
                  id="logoutbuttonid"
                  type="submit"
                  value="Log out"
                  onClick={LogOut}
                /> */}
              </div>
            </form>
          </div>
        </div>
        <div className="ExploreGroupssection">
          <div className="profile-card">
            <div className="profile-card__image">
              <img src={imageUrl} />
            </div>
            <div className="profile-card__details">
              <h2 className="profile-card__username">
                <h1>Username:</h1>
                {tempuserName}
              </h2>
              {/* <h2 className="profile-card__bio">
        <h1>Bio:</h1>
          {tempdescription}
        </h2> */}
              <h2 className="profile-card__phonenumber">
                <h1>Phone Number:</h1>
                {tempphone}
              </h2>
              {/* <h2 className="profile-card__location">
        <span>
          <h1>Location:</h1>
          {city}, {state}
        </span> 
        </h2> */}
              <h2 className="profile-card__zip">
                <span>
                  <h1>Zip:</h1>
                  {tempzip}
                </span>
              </h2>
              {/* <h2 className="profile-card__Petamount">
          <span> 
            <h1>Pets Posted:</h1>  
            {manage}
          </span>
        </h2> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Accountpage;
