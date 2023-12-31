import React from "react";
import HeroImage from "../photos/HeroImage.png";
import dogIcon from "../photos/dog.png";
import caticon from "../photos/cat.png";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import "./styles/FindPets.css";
import { useState, useEffect } from "react";
import { fetchToken } from "../api/petFinderToken";
// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";
import {  createTheme } from "@mui/material";



const API_URL = "https://api.petfinder.com/v2/animals?&limit=50";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4169e1f4',
      darker: '#455e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


const FindPetPage = () => {
  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);
  const [breed, setBreed] = useState("");
  const [petBreeds, setPetBreeds] = useState([]);
  const [species, setSpecies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [zip, setZip] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [petsReturned, setPetsReturned] = useState(0);
  const [userLocation, setUserLocation] = useState({lat: null , lng: null});
  const [fetchingUserLocation, setFetchingUserLocation] = useState(null);


  const fetchPetsWithLocation = async (animal, location) => {
    setIsLoading(true);
    let petsWithPhotos = [];
    const token = await fetchToken();
      while (petsWithPhotos.length < 21) {
        const response = await fetch(`${API_URL}${animal}&location=${location.lat},${location.lng}`, {
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

        const petsReturned = data.pagination.total_count;
        const formattedPetsReturned = petsReturned.toLocaleString();
        setPetsReturned(formattedPetsReturned);

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

  const FetchPets = async (animal) => {
    setIsLoading(true);
    let petsWithPhotos = [];
    const token = await fetchToken();
    const url = `https://api.petfinder.com/v2/animals?type=${animal}&limit=50`;
      while (petsWithPhotos.length < 21) {
        console.log(url);
        const response = await fetch(`${url}${animal}`, {
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

        const petsReturned = data.pagination.total_count;
        const formattedPetsReturned = petsReturned.toLocaleString();
        setPetsReturned(formattedPetsReturned);

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

  const FetchFilteredPets = async (query, page, location) => {
    setIsLoading(true);
    let petsWithPhotos = [];
    let fetchUrl = "";
    const token = await fetchToken();
    console.log(location);
    if(location === undefined) {
       fetchUrl = `${API_URL}${query}&page=${page}`;
    }else{
       fetchUrl = `${API_URL}${query}&page=${page}&location=${location.lat},${location.lng}`;
    }

    const response = await fetch(`${fetchUrl}`, {
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
    const petsReturned = data.pagination.total_count;
    const formattedPetsReturned = petsReturned.toLocaleString();
    setPetsReturned(formattedPetsReturned);

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
      setfirstcall(false);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    FetchFilteredPets(query, currentPage, userLocation);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
    FetchFilteredPets(query, currentPage, userLocation);
  };

  const filterPets = async () => {
    // const animalInput = document.getElementById("animalinput").value;
    // const breedInput = document.getElementById("breedinput").value;
    // const zipcodeInput = document.getElementById("zipcodeinput").value;
    // const genderInput = document.getElementById("genderinput").value;
    // const ageInput = document.getElementById("ageinput").value;

    const animalInput = species;
    const breedInput = breed;
    const zipcodeInput = zip;
    const genderInput = gender;
    const ageInput = age;

    console.log(animalInput, breedInput, zipcodeInput, genderInput, ageInput);

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

    console.log("query", queryString);
    setQuery(queryString);

    if (queryString === "") {
      alert("Please Select A Filter");
    } else if (userLocation.lat !== null && userLocation.lat !== null) {
      await FetchFilteredPets(queryString, currentPage, userLocation);
    } else {
      await FetchFilteredPets(queryString, currentPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (species === "Dog") {
          response = await axios.get("https://dog.ceo/api/breeds/list/all");
          setPetBreeds(Object.keys(response.data.message));
        } else if (species === "Cat") {
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

    if (species && petBreeds.length === 0) {
      fetchData();
    }
  }, [species, petBreeds]);

  useEffect(() => {
    // Get the user's location using the HTML5 Geolocation API
    if (navigator.geolocation) {
      setFetchingUserLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setFetchingUserLocation(false);
        },
        (error) => {
          console.log("Unable to retrieve your location");
          setFetchingUserLocation(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    if (userLocation.lat !== null && userLocation.lng !==null && firstcall) {
      fetchPetsWithLocation("", userLocation);
      console.log("called");
    }
    else if(fetchingUserLocation === false && firstcall){
      FetchPets("");
      console.log("called no location");
    }

  }, [petcard, firstcall, userLocation, fetchingUserLocation]);

  const handleSpeciesChange = (event) => {
    setSpecies(event.target.textContent);
  };

  const handleBreedChange = (event) => {
    if (event === null) {
      // Handle the case where no breed is selected
      console.log(event);
    } else {
      const selectedBreed = event.target.innerText;
      setBreed(selectedBreed);
    }
  };

  const handleAgechange = (event) => {
    setAge(event.target.innerText);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.innerText);
  };

  const handleZipChange = (event) => {
    setZip(event.target.value);
  };

  return (
    <div className="findpets-home-page">
      <div className="featured-section">
        {userLocation.lat !== null && userLocation.lat !== null?(
            <h2 className="petsReturnedText">
            We located {petsReturned} pets that are ready to be adopted near you!
          </h2>
        ):
        (
          <h2 className="petsReturnedText">
          We located {petsReturned} pets that are ready to be adopted!
        </h2>
        )}
        {isLoading ? (
          <div className="loadingScreen">
            <h1 className="loadingText">
              Stay put while we fetch our furry friends
            </h1>
            <CircularProgress classname="loading" size="lg" />
          </div>
        ) : (
          <div className="filterAndCards">
            <div className="filtersContainer">
              <label className="find-pet-select" for="animalinput">
                Animal
              </label>
              <Select
                onChange={handleSpeciesChange}
                id="animalinput"
                placeholder="Select"
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="bird">Bird</Option>
                <Option value="rabbit">Rabbit</Option>
              </Select>
              <label className="find-pet-select" for="breedinput">
                Breed
              </label>
              <Select
                placeholder="Select"
                id="breedinput"
                onChange={handleBreedChange}
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {petBreeds.map((breed) => (
                  <Option key={breed} value={breed}>
                    {breed.charAt(0).toUpperCase() + breed.slice(1)}
                  </Option>
                ))}
              </Select>

              <label className="find-pet-select" for="genderinput">
                Gender
              </label>
              <Select
                id="genderinput"
                placeholder="Select"
                indicator={<KeyboardArrowDown />}
                onChange={handleGenderChange}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {/* <Option value="">Select</Option> */}
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>

              <label className="find-pet-select" for="ageinput">
                Age
              </label>
              <Select
                id="ageinput"
                placeholder="Select"
                indicator={<KeyboardArrowDown />}
                onChange={handleAgechange}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {/* <Option value="">Select</Option> */}
                <Option value="baby">Baby</Option>
                <Option value="young">Young</Option>
                <Option value="adult">Adult</Option>
                <Option value="Senior">Senior</Option>
              </Select>

              <label className="find-pet-select" for="zipcodeinput">
                Zipcode
              </label>
              <Input
                type="text"
                id="zip-input"
                sx={{ width: 240 }}
                placeholder="Enter a zip code"
                onChange={handleZipChange}
              ></Input>
              <Button
                className="filter-button"
                style={{
                  borderRadius: 10,
                }}
                color="primary"
                onClick={filterPets}
                sx={{ width: 240, marginTop: 6 }}
              >
                Filter Pets
              </Button>
            </div>
            <div className="petCardDisplay">
              {petcard?.length > 0 ? (
                <div className="findpetcardcontainer">
                  {petcard.map((petinfo, index) => (
                    <PetCard key={index} petinfo={petinfo} />
                  ))}
                </div>
              ) : (
                <div className="empty">No pets found.</div>
              )}
            </div>
          </div>
        )}
        <div className="pageButtonsContainer">
          <Button
            className="pagination-button"
            onClick={() => {
              handlePreviousPage();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            sx={{ width: 75, margin: 2 }}
          >
            ←
          </Button>
          <h3>page {currentPage}</h3>
          <Button
            className="pagination-button"
            onClick={() => {
              handleNextPage();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            sx={{ width: 75, margin: 2 }}
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
};


export default FindPetPage;
