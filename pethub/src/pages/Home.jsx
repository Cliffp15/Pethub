import React from "react";
import HeroImage from "../photos/DogBlueBackground.jpg";
import dogIcon from "../photos/dog.png";
import shiba from "../photos/shiba.png";
import clock from "../photos/clock.png";
import animalcarecolor from "../photos/animalcarecolor.png";
import animalinformation from "../photos/animalinformation.png";



import caticon from "../photos/cat.png";

import "./styles/homepage.css";
import { useState, useEffect } from "react";
import { fetchToken } from "../api/petFinderToken";
// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

// const searchAPI_URL = "https://api.petfinder.com/v2/animals?&limit=20&type=";
const API_URL = "https://api.petfinder.com/v2/animals?limit=20&page=";

const searchAPI_URL = "https://api.petfinder.com/v2/animals?type=";

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

  let pagination = 1;
  const Fetchpets = async (pagination) => {
    const token = await fetchToken();
    let petsWithPhotos = [];
    while (petsWithPhotos.length < 6) {
      const response = await fetch(`${API_URL}${pagination}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
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

    setpetcard(petsWithPhotos.slice(0, 6));

    setfirstcall(false);
    //  return data;
  };

  const searchFetchpets = async (animal) => {
    const token = await fetchToken();
    let petsWithPhotos = [];
    while (petsWithPhotos.length < 6) {
      const response = await fetch(`${searchAPI_URL}${animal}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`${API_URL}${animal}`);

      const data = await response.json();
      console.log(data);

      const animals = Object.values(data.animals);

      const animalsWithPotos = animals.filter(
        (pet) => !Array.isArray(pet.photos) || pet.photos.length > 0
      );
      petsWithPhotos = [...petsWithPhotos, ...animalsWithPotos];
      console.log(petsWithPhotos);
      pagination++;
    }

    setpetcard(petsWithPhotos.slice(0, 6));

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
    searchFetchpets(`${animalinput}&breed=${breedinput}&location=${zipcodeinput}`);
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
          <h1>Find <br/> the purfect <br/> pet for you!</h1>
          <div className="hero-section-content-wrapper">
          <h2 >Enter your location and pet of choice to find a pet near you.</h2>
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
      </div>
      <div className="benefit-banner" id="bannerid">
          <div className="benefit-1">
            <h1>Save Time</h1>
            <img src={clock} alt="dog icon" className="dog-icon" />
            <p>Instead of spending hours driving around to different shelters, you can browse through multiple pets available for adoption in one place. This saves time and energy while increasing your chances of finding the perfect pet.
            </p>
          </div>
          <div className="benefit-2">
          <h1>Save A Life</h1>
            <img src={animalcarecolor} alt="dog icon" className="dog-icon" />
            <p>By adopting a pet from a shelter or rescue group, you are helping to save a life. Many pets in shelters are euthanized each year due to overcrowding, so adopting a pet can make a real difference.
            </p>
          </div>
          <div className="benefit-3">
          <h1>Convenient Access to Information</h1>
            <img src={animalinformation} alt="dog icon" className="dog-icon" />
            <p>Pet adoption sites allow you to easily access information about pets available for adoption. You can filter pets by breed, size, age, and location to find the perfect match for you and your family.
            </p>
          </div>
      </div>
      
      <div className="featured-section">
        
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
      <div className="Mission-statement">
        <div className="Mission-statement-text">
        <h2>What we do</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque auctor odio ac scelerisque tincidunt. 
          Nunc maximus auctor nunc, id faucibus magna interdum eget. 
          Maecenas tincidunt convallis erat vitae commodo. 
          Maecenas pulvinar eros vel lacus faucibus congue. 
          Integer eu ultrices elit. Nunc leo metus, accumsan quis 
          porttitor nec, convallis non nisl. Mauris et lacus mattis, 
          pharetra sapien sed, euismod ipsum. Nam quis nisl nisl. 
          Donec eu euismod dolor. Aliquam erat volutpat. 
          Sed maximus leo purus, vitae rhoncus nisi ultrices eget. 
          Donec molestie blandit bibendum.
        </p>
        </div>
        <div className="Mission-statement-image">
        <img src={shiba} alt="shiba icon" className="shiba-icon" />
        </div>
      </div>
    </div>
  );
};

export default Home;
