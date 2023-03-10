import React from "react";
import HeroImage from "../photos/HeroImage.png";
import dogIcon from "../photos/dog.png";

import caticon from "../photos/cat.png";

import "./styles/homepage.css";
import { useState, useEffect } from "react";
import { fetchToken } from "../api/petFinderToken";
// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

// const API_URL = "https://api.petfinder.com/v2/animals?&limit=20&type=";
const API_URL = "https://api.petfinder.com/v2/animals?&limit=20&page=";

// const API_URL = "https://api.petfinder.com/v2/animals?type=";

const Home = () => {
  const [data, setData] = useState([]);
  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const token = await fetchToken();
      const response = await fetch(`${API_URL}cat`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setpetcard(data.animals);
      setfirstcall(false);
    }, 3600000); // 1 hour = 3,600,000 milliseconds
    return () => clearInterval(intervalId);
  }, []);

  let pagination =1;
  const Fetchpets = async (pagination) => {
    const token = await fetchToken();
    let petsWithPhotos = [];
    
    while (petsWithPhotos.length < 20) {
      const response = await fetch(`${API_URL}${pagination}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          //Bearer token needs to be updated every hour for access to api
          // or it will produce 401 Error

          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`${API_URL}${pagination}`);

      const data = await response.json();
      console.log(data);

      const filteredData = Object.values(data.animals);
      const newPets = filteredData.filter(
        (pet) => !Array.isArray(pet.photos) || pet.photos.length > 0
      );
      petsWithPhotos = [...petsWithPhotos, ...newPets];
      console.log(petsWithPhotos);
      pagination++;
    }

    setpetcard(petsWithPhotos.slice(0, 20));

    setfirstcall(false);
    //  return data;
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
      Fetchpets("1");
    }
  }, [petcard, firstcall]);

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
