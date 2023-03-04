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
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImY4MjVjMTUzM2I4M2IxNTZiMDc0ODdmZmI0NDlkZTdmMTU1ZjdhMjBkYzZhMjExMmRhMTkxZDFiMWY0YWU0Njc4OGE3ZmZmNWE4NWM3NjhhIiwiaWF0IjoxNjc3OTUwNDg0LCJuYmYiOjE2Nzc5NTA0ODQsImV4cCI6MTY3Nzk1NDA4NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.a54ixVwnIbNlylxLTRB4pcWpd01njPeo1RSsynD40BUv4PZhA7Lp2XfGEJG6SVuXmQx2eed_7dVk4-ChaaIpKdMCiV-tqrnt5fZu7ipJrgF87a0F694CfUFGlo78lmqPPImd86GOcjCgO70tVXj6y_oyVjyR_GYk412Z0PfiOJ_NRRWtVB8z_NkgZOIrz_lH9C1H4WtPqxAxzAu1OxWYXULydK7GEM043LhF-t4soo3BsIyXA0rB09SKAswsdZZ2dPKati3T4uEDjIKj6NACGVUy0Lj6G7CYiOnsUu546CgamyGyF4jceNk8Q7tXzXi2oATtcN93dcwoeHnc8jyf5g",
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
