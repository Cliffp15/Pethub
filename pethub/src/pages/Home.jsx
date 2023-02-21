import React from "react";
import HeroImage from "../photos/HeroImage.png";
import caticon from "../photos/cat.png";
import kitten from "../photos/kitten.jpg";
import heart from "../photos/heart.png";
import "./styles/homepage.css";
import { useState, useEffect } from "react";

// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

// const API_URL = "https://api.petfinder.com/v2/animals?type=";
const API_URL = "https://api.petfinder.com/v2/animals?&type=";

const Home = () => {
  let firstcall = true;
  const [petcard, setpetcard] = useState([]);

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
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6IjJhZmRiZDMzODVlNzY2NmJkZjA4NGIxYzFlZmZkMThmZjJhZWE3MWVhMWE2MGY0MzRjMDRhZjQ2NTZjZWZiOTJkM2QyODBhZWY5Y2E4OWUwIiwiaWF0IjoxNjc3MDEyOTM0LCJuYmYiOjE2NzcwMTI5MzQsImV4cCI6MTY3NzAxNjUzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.IWqBFmQMT1PSNUjYJywPG1X2Q8pJLrKh_bWgyGMFKh0ILxrJk_tRCuNodtFPlH0qy7ZwvSM41vAscVvwfdsthQxR-o3Oc5vf540fOLsRY_jqOtyXbo9-N_aeCdT-X_IguRp8wZRWSbX2XcwxAnWchaUqyn0E-n8OicaRz0o4-RTpyWzlS7g67NsD31znuPePJaPmNkXJv4fQf3oFGOHH_071-hNLdgbeYnAG9b5vtmkOUhIl25-7ynec7jfBvDzDokMKDiV3ooq8-VpJT8Ajp85iPs4eMbcTBWvyiD_1nZTDje3AYk32tdmB-tzvq1KWY7etYqcRXm0Snb5FQkVqdA'
      },
    });

    const data = await response.json();

    console.log(data);
    console.log(data.animals);
    setpetcard(data.animals);
    console.log(petcard);
  };

  useEffect(() => {
    if (firstcall) {
      Fetchpets("dog");
      firstcall = false;
    }
  }, petcard);

  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={HeroImage} alt="heroimage" />
        <h1>Find the purrfect pet for you!</h1>

        <div className="search-for-animal">
          <input placeholder="City" type="text" id="cityinput" />
          {/* create a dropdown for state */}
          <input placeholder="State" type="text" id="stateinput" />
          <input placeholder="Animal" type="text" id="animalinput" />
          <input placeholder="Breed" type="text" id="breedinput" />
          <button className="searchbutton"> Search </button>
        </div>
      </div>
      <div className="featured-section">
        <h1 className="featured-banner">Featured Pets</h1>
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
