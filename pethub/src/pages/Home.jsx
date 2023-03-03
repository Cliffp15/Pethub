import React from "react";
import HeroImage from "../photos/HeroImage.png";
import dogIcon from "../photos/dog.png";

import "./styles/homepage.css";
import { useState, useEffect } from "react";

// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

const API_URL = "https://api.petfinder.com/v2/animals?&limit=20&type=";

const Home = () => {
  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);

  const Fetchpets = async (animal) => {
    let petsWithPhotos = [];
    while (petsWithPhotos.length < 20) {
      const response = await fetch(`${API_URL}${animal}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          //Bearer token needs to be updated every hour for access to api
          // or it will produce 401 Error
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImEzYWM4Yzg0Y2Q2OGY0Yzg4MzJhNWQ1ZDZmNDZlOTkxN2ExNGVjZWI0ODdmZTNjMWQwOWU5ZDI3NTdmMWRjNzdhYTU2YzM2MjliNjZiMjk3IiwiaWF0IjoxNjc3Nzk2NzU1LCJuYmYiOjE2Nzc3OTY3NTUsImV4cCI6MTY3NzgwMDM1NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.H7vd_T9xDWBsUYy2EkwOLz7VhvMvN8O5Fp-BkxFE2zpu1ZOdNHMycAHhip_4qcFzm6T41u_ZgAumaGugt_swqH2eU9bplZQBprhcAuRMKrKlU8AkBANOABIXgUgzAl3NHrd7v3WTCvWKRc4W9x1V6LiKbmiPZcIeLe9T2PFBU4vNuslKTHurx90MtA0MIzTDCKpmyPYYJXT1jblyJPQHijzS7PMUAGn44ocM9AufDEC8ByabufsUffDg9oG0MRqh99sSZKeqEKG_LhfbzBVFPrG9Ph07i-isfFOI4duRk6xA_g88glpX7TsGSbQbEC1MpjZebWn9MaqEVaAOBVydxg",
        },
      });
      console.log(`${API_URL}${animal}`);

      const data = await response.json();
      console.log(data);

      const filteredData = Object.values(data.animals);
      const newPets = filteredData.filter(
        (pet) => !Array.isArray(pet.photos) || pet.photos.length > 0
      );
      petsWithPhotos = [...petsWithPhotos, ...newPets];
      console.log(petsWithPhotos);
    }

    setpetcard(petsWithPhotos.slice(0, 20));

    setfirstcall(false);
  };

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
          <div className="search-for-animal">
            {/* <input placeholder="City" type="text" id="cityinput" /> */}
            <input
              placeholder="Zip Code"
              type="text"
              id="zipcodeinput"
              className="home-input"
            />
            {/* create a dropdown for state */}
            {/* <input placeholder="State" type="text" id="stateinput" /> */}
            <input
              placeholder="Animal"
              type="text"
              id="animalinput"
              className="home-input"
            />
            <input
              placeholder="Breed"
              type="text"
              id="breedinput"
              className="home-input"
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
          <div className="petcardcontainer">
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
