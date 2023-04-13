import React from "react";
import HeroImage from "../photos/HeroImage.png";
import dogIcon from "../photos/dog.png";
import caticon from "../photos/cat.png";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import "./styles/FindPets.css";
import { useState, useEffect } from "react";
import { fetchToken } from "../api/petFinderToken";
// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";

const API_URL = "https://api.petfinder.com/v2/animals?&limit=50";

const FindPetPage = () => {
  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);
  const [breed, setBreed] = useState("");
  const [petBreeds, setPetBreeds] = useState([]);
  const [species, setSpecies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Fetchpets = async (animal) => {
    setIsLoading(true);
    let petsWithPhotos = [];
    const token = await fetchToken();
    while (petsWithPhotos.length < 21) {
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

    setpetcard(petsWithPhotos.slice(0, 21));

    setfirstcall(false);
    setIsLoading(false);
  };

  const FetchFilteredPets = async (query, page) => {
    setIsLoading(true);
    let petsWithPhotos = [];
    const token = await fetchToken();
    const response = await fetch(`${API_URL}${query}&page=${page}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`${API_URL}${query}&page=${page}`);

    const data = await response.json();
    console.log(data);

    if (Object.keys(data.animals).length === 0) {
      alert("No pets found!");
    } else {
      const animals = Object.values(data.animals);

      const animalsWithPotos = animals.filter(
        (pet) => !Array.isArray(pet.photos) || pet.photos.length > 0
      );

      petsWithPhotos = [...petsWithPhotos, ...animalsWithPotos];

      console.log(animalsWithPotos, petsWithPhotos);

      setpetcard(petsWithPhotos.slice(0, 21));
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    FetchFilteredPets(query, currentPage);
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    FetchFilteredPets(query, currentPage);
  }

  const filterPets = async () => {
    const animalInput = document.getElementById("animalinput").value;
    const breedInput = document.getElementById("breedinput").value;
    const zipcodeInput = document.getElementById("zipcodeinput").value;
    const genderInput = document.getElementById("genderinput").value;
    const ageInput = document.getElementById("ageinput").value;

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

    if (queryString === "") {
      alert("Please Select A Filter");
    } else {
      setQuery(queryString);
      await FetchFilteredPets(queryString, currentPage);
    }
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
          <label className="find-pet-select" for="animalinput">
            Animal:
          </label>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            id="animalinput"
            placeholder="Select"
          >
            <option value="">Select</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
          </select>

          <label className="find-pet-select" for="breedinput">
            Breed:
          </label>
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

          <label className="find-pet-select" for="genderinput">
            Gender:
          </label>
          <select id="genderinput">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label className="find-pet-select" for="ageinput">
            Age:
          </label>
          <select id="ageinput">
            <option value="">Select</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>

          <label className="find-pet-select" for="zipcodeinput">
            Zipcode:
          </label>
          <input type="text" id="zipcodeinput"></input>

          <button className="filter-button" onClick={filterPets}>
            Filter Pets
          </button>
        </div>
        {isLoading ? (
        <div className="loading">
          <CircularProgress size="lg" />
        </div>
      ) : petcard?.length > 0 ? (
        <div className="findpetcardcontainer">
          {petcard.map((petinfo, index) => (
            <PetCard key={index} petinfo={petinfo} />
          ))}
        </div>
      ) : (
        <div className="empty">
          No pets found.
        </div>
      )}
         <button
          className="pagination-button"
          onClick={() => {handlePreviousPage();
          window.scrollTo(0, 950);}}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          className="pagination-button"
          onClick={() => {handleNextPage();
          window.scrollTo(0, 950);}}
        >
          Next
        </button>
        <h3> page: {currentPage}</h3>
      </div>
    </div>
  );
};

export default FindPetPage;
