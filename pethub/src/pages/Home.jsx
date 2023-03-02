import React from "react";
import HeroImage from "../photos/HeroImage.png";
import dogIcon from "../photos/dog.png";
import caticon from "../photos/cat.png";

import "./styles/homepage.css";
import StateSelector from "../components/StateSelector";
import { useState, useEffect } from "react";

// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

const API_URL = "https://api.petfinder.com/v2/animals?type=";

// const Home = () => {
//   let firstcall = true;
//   const [petcard, setpetcard] = useState([]);
//   const [selectedState, setSelectedState] = useState("");

//   const handleStateChange = (event) => {
//     setSelectedState(event.target.value);
//   };

const Home = () => {
  const Fetchpets = async (animal) => {
    const response = await fetch(`${API_URL}${animal}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        //Bearer token needs to be updated every hour for access to api
        // or it will produce 401 Error
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImI4MDQyZDczNTdjNTNlNzUyYTMwN2U4ODU0NWJlZTllMDRiNTBiYjA4OGYzMjFkMDU0OGRiOTRhOTc4M2E0YjRiYjljYzViYmM2MTMzNmExIiwiaWF0IjoxNjc3MTA2NjQ3LCJuYmYiOjE2NzcxMDY2NDcsImV4cCI6MTY3NzExMDI0Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.sNE8Mw4nWzsy14XbfdJQSaeswzCy5TbhjG4iShN2KCce_YqRD9dFKFcWmYKdHys6YlZb4AU4LBFOquCBOA9-PK45J9fNGO_qmtzb7bfPkLuAR1l4nKL0bZEIJvX7LLXDg_y07lldKstTrIWHJyXiDfp4c6e_vscIfp6CZwS-JvMfLwOYe7P1YH8dKVlYIG0FeUa8ZNvSLQiZRLrQbjcSKRC7VROlQelZ9CzMqGNZDJKAIv98OInbc7TEddv2CocnC8DVjrtpUbcR3eV7wHIid3uGI0_OS0srNcM8jGvjkACtcf281pxSDLYr08EidSyn74lNmcO3OuclNWbwZvBmiw",
      },
    });
    console.log(`${API_URL}${animal}`);
    const data = await response.json();

    console.log(data);
    console.log(data.animals);
    setpetcard(data.animals);
    setfirstcall(false);
    // console.log(petcard);
    return data;
  };

  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);

  const SearchPets = async () => {
    // debugger;

    // const cityinput = document.getElementById("cityinput").value;
    const zipcodeinput = document.getElementById("zipcodeinput").value;
    // const stateinput = document.getElementById("stateinput").value;
    const animalinput = document.getElementById("animalinput").value;
    const breedinput = document.getElementById("breedinput").value;

    Fetchpets(`${animalinput}&breed=${breedinput}&location=${zipcodeinput}`);
  };

  useEffect(() => {
    if (firstcall) {
      Fetchpets("");
    }
  }, [petcard, firstcall]);
  // const SearchPets=async () =>{

  // // const params = URLSearchParams({
  // //   type: animalinput,
  // //   breed: breedinput,
  // //   city: cityinput,
  // //   state: stateinput
  // // });
  // const params = new URLSearchParams({
  //   type: animalinput,
  //   breed: breedinput,
  //   location: cityinput,stateinput
  // });

  // const SearchAPI_URL = `https://api.petfinder.com/v2/animals?type=${animalinput}&breeds=${breedinput}/location/${stateinput}/${cityinput}`;

  // console.log(params);
  // console.log(new URLSearchParams({
  //   type: animalinput,
  //   breeds: breedinput,
  //   city: cityinput,
  //   state: stateinput
  // }));

  //   const newresponse = await fetch(`${SearchAPI_URL}`, {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-type": "application/json",
  //       //Bearer token needs to be updated every hour for access to api
  //       // or it will produce 401 Error
  //       Authorization:
  //         'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6ImYyODMyNmFlNzg2Mjg1NDRkMzc5Y2I2MWRhZDY3MDYxMWIxODA0ZDQwZjZiZDQyYzllYzZlZGRmNTAxZTA0YTMzYTgyN2EzZDQwOWVjYWU3IiwiaWF0IjoxNjc3MDk3MjgzLCJuYmYiOjE2NzcwOTcyODMsImV4cCI6MTY3NzEwMDg4Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.u-V6TiEPREl7PBef0MnGo_KnooAL4iXIrOAdP0856NVw5d0e4cKA-8Ja4XkZ1XdaeFpQqmaPMi_b8-3am884_4ByaoveMqdJVf01v1TsGO9pOfzd90ZfesKi-h5_fnhM_wnCKI4ymvkGf_OHUvT6rh4rAdX3kOI9CnYBsFF7-FEmBuILevoOwFmpi6reZFQg9S6qwKJ8PHD1ZTxwP4Hi55bCi9DooP8aiXK5I_HPFAQ4x8yzuFuDlmB3o10iv2uEsVp-dLBMIO-uSKASl2aD6vMRa0Gc7garoxNM208G5jjGwkTb4HIRgR-5P6f5Zr3iujQgs8_GmSWIaY_whJ7a9w'
  //     },
  //   });

  //     const newdata = await newresponse.json();

  //     console.log(newdata);
  //     console.log(newdata.animals);
  //     setpetcard(newdata.animals);
  //     console.log(petcard);
  // };

  // useEffect(() => {
  //   if (firstcall) {
  //     SearchPets();
  //     firstcall = false;
  //   }
  // }, petcard);

  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={HeroImage} alt="heroimage" />
        <h1>Find the purrfect pet for you!</h1>
        <div className="search-container">
          {/* create a dropdown for state */}

          <div className="search-for-animal">
            {/* <input placeholder="City" type="text" id="cityinput" /> */}
            <input
              className="home-input"
              placeholder="Zip Code"
              type="text"
              id="zipcodeinput"
            />
            {/* create a dropdown for state */}
            {/* <input placeholder="State" type="text" id="stateinput" /> */}
            <input
              className="home-input"
              placeholder="Animal"
              type="text"
              id="animalinput"
            />
            <input
              className="home-input"
              placeholder="Breed"
              type="text"
              id="breedinput"
            />
            <button className="search-button" onClick={SearchPets}>
              {" "}
              Search{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="featured-section">
        <h1 className="featured-banner" id="bannerid">
          <img src={dogIcon} alt="dog icon" className="dog-icon" />
          Featured Pets
          <img src={dogIcon} alt="dog icon" className="dog-icon" />
        </h1>
        {petcard?.length > 0 ? (
          <div className="pet-card-container">
            {petcard.map((petinfo, index) => (
              <PetCard key={index} petinfo={petinfo} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>
              {" "}
              <span>
                No pet found. <br />
                Hint: Make sure API key/Authorization is up to date{" "}
              </span>{" "}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
