import React from "react";
import HeroImage from "../photos/HeroImage.png";
import dogIcon from "../photos/dog.png";
import caticon from "../photos/cat.png";
import axios from "axios";

import "./styles/homepage.css";
import { useState, useEffect } from "react";
import { fetchToken } from "../api/petFinderToken";
// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

const API_URL = "https://api.petfinder.com/v2/animals?&limit=50";

const FindPetPage = () => {
  const [data, setData] = useState([]);
  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);
  const [breed, setBreed] = useState("");
  const [petBreeds, setPetBreeds] = useState([]);
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  const Fetchpets = async (animal) => {
    let petsWithPhotos = [];
    const token = await fetchToken();
    while (petsWithPhotos.length < 20) {
      const response = await fetch(`${API_URL}${animal}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);

      const animals = Object.values(data.animals);

      const animalsWithPotos = animals.filter(
        (pet) => !Array.isArray(pet.photos) || pet.photos.length > 0
      );

      petsWithPhotos = [...petsWithPhotos, ...animalsWithPotos];
      console.log(animalsWithPotos, petsWithPhotos);
    }

    setpetcard(petsWithPhotos.slice(0, 20));

    setfirstcall(false);
  };

  const FetchFilteredPets = async (animal) =>{
    let petsWithPhotos = [];
    const token = await fetchToken();
    const response = await fetch(`${API_URL}${animal}`, {
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

    console.log(animalsWithPotos, petsWithPhotos);

    setpetcard(petsWithPhotos.slice(0, 20));

  }

  const filterPets = async () => {
    const animalInput = document.getElementById("animalinput").value;
    const breedInput = document.getElementById("breedinput").value;
    const zipcodeInput = document.getElementById("zipcodeinput").value;
    const genderInput = document.getElementById("genderinput").value;
    const ageInput = document.getElementById("ageinput").value

    // if (animalInput === ""){
    //   alert("Please Select An Animal")
    // }

    console.log(animalInput);

    let queryString = "";

    if (animalInput !== "" && animalInput !== "other") {
      queryString += `&type=${animalInput}`;
    }
  
    if (breedInput !== "") {
      queryString += `&breed=${breedInput}`;
    }
  
    if (zipcodeInput !== "") {
      queryString += `&location=${zipcodeInput}`;
    }
  
    if (genderInput !== "") {
      queryString += `&gender=${genderInput}`;
    }
  
    if (ageInput !== "") {
      queryString += `&age=${ageInput}`;
    }
  
    await FetchFilteredPets(queryString);
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (species === "dog") {
          response = await axios.get("https://dog.ceo/api/breeds/list/all");
          setPetBreeds(Object.keys(response.data.message));
        } else if (species === "cat") {
          response = await axios.get("https://api.thecatapi.com/v1/breeds");
          setPetBreeds(response.data.map((breed) => breed.name));
        } else {
          setPetBreeds([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (species) {
      fetchData();
    }
  }, [species]);

  useEffect(() => {
    if (firstcall) {
      Fetchpets("");
    }
  }, [petcard, firstcall]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={HeroImage} alt="heroimage" />
        <h1>Find the purrfect pet for you!</h1>
      </div>
      <div className="featured-section">
        <h1 className="featured-banner" id="bannerid">
          <img src={dogIcon} alt="dog icon" className="dog-icon" />
          Find A Pet
          <img src={dogIcon} alt="dog icon" className="dog-icon" />
        </h1>
        <div className="filtersContainer">
          <label for="animalinput">Animal:</label>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            id="animalinput"
            placeholder="Select"
          >
            <option value="">Select</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>

          <label for="breedinput">Breed:</label>
          <select
            id="breedinput"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value="">Select</option>
            {petBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed.charAt(0).toUpperCase() + breed.slice(1)}
              </option>
            ))}
          </select>

          {/* <label for="sizeinput">Size:</label>
          <input type="checkbox" id="sizeinput_small" value="Small"></input>
          <label for="sizeinput_small">Small</label>
          <input type="checkbox" id="sizeinput_medium" value="Medium"></input>
          <label for="sizeinput_medium">Medium</label>
          <input type="checkbox" id="sizeinput_large" value="Large"></input>
          <label for="sizeinput_large">Large</label>
          <input
            type="checkbox"
            id="sizeinput_xlarge"
            value="Extra Large"
          ></input>
          <label for="sizeinput_xlarge">Extra Large</label> */}

          <label for="genderinput">Gender:</label>
          <select id="genderinput">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label for="ageinput">Age:</label>
          <select id="ageinput">
            <option value="">Select</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>

          <label for="zipcodeinput">Zipcode:</label>
          <input type="text" id="zipcodeinput"></input>

          <button onClick={filterPets}>Filter Pets</button>
        </div>
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

export default FindPetPage;
