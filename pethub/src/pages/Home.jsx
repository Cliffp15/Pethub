import React from "react";
import HeroImage from "../photos/DogBlueBackground.jpg";
import shiba from "../photos/shiba.png";
import clock from "../photos/clock.png";
import animalcarecolor from "../photos/animalcarecolor.png";
import animalinformation from "../photos/animalinformation.png";
import CircularProgress from "@mui/joy/CircularProgress";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchToken } from "../api/petFinderToken";
import PetCard from "../components/PetImageSelection";
import WhoWeAre from "../components/WhoWeAre";
import "./styles/homepage.css";
import "./styles/Navbar.css";


// const searchAPI_URL = "https://api.petfinder.com/v2/animals?&limit=20&type=";
const API_URL = "https://api.petfinder.com/v2/animals?limit=20&page=";
const searchAPI_URL = "https://api.petfinder.com/v2/animals?type=";

const Home = () => {

  const navigate = useNavigate();

  const handleSeeMorePetsClick = () => {
    navigate(`/findapet`);
  };

  const [data, setData] = useState([]);
  const [petcard, setpetcard] = useState([]);
  const [firstcall, setfirstcall] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     const token = await fetchToken();
  //     const response = await fetch(`${API_URL}cat`, {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setpetcard(data.animals);
  //     setfirstcall(false);
  //   }, 3600000); // 1 hour = 3,600,000 milliseconds
  //   return () => clearInterval(intervalId);
  // }, []);

  
  let pagination = 1;
  const Fetchpets = async (pagination) =>{
    setIsLoading(true);
    const token = await fetchToken();
    let petsWithPhotos = [];
    while (petsWithPhotos.length < 6){
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
    setIsLoading(false);
    //  return data;

    // setTotalPages(Math.ceil(data.pagination.total_count / 6));
  };

  const searchFetchpets = async (animal, page) => {
    setIsLoading(true);
    const token = await fetchToken();
    let petsWithPhotos = [];

    //
    //     while (petsWithPhotos.length < 4) {
    //       const response = await fetch(`${searchAPI_URL}${animal}`, {
    // =======
    // <<<<<<< HEAD
    //     while (petsWithPhotos.length < 4) {
    //       const response = await fetch(`${searchAPI_URL}${animal}`, {
    // =======
    while (petsWithPhotos.length < 6) {
      const response = await fetch(`${searchAPI_URL}${animal}&page=${page}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`${API_URL}${animal}&page=${page}`);

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

    setpetcard(petsWithPhotos.slice(0, 4));

    setfirstcall(false);
    setIsLoading(false);

    // setTotalPages(Math.ceil(data.pagination.total_count / 6));
  };
  const SearchPets = async () => {
    // debugger;

    // const cityinput = document.getElementById("cityinput").value;
    const zipcodeinput = document.getElementById("zipcodeinput").value;
    // const stateinput = document.getElementById("stateinput").value;
    const animalinput = document.getElementById("animalinput").value;
    const breedinput = document.getElementById("breedinput").value;

    const query = `${animalinput}&breed=${breedinput}&location=${zipcodeinput}`;
    setSearchQuery(query);
    console.log(query);
    searchFetchpets(query);
  };

  const handleNextPage = async () => {
    setCurrentPage((prev) => prev + 1);
    if (searchQuery !== "") {
      searchFetchpets(searchQuery, currentPage);
    } else {
      Fetchpets(currentPage);
    }
  };

  const handlePrevPage = async () => {
    setCurrentPage((prev) => prev - 1);
    if (searchQuery !== "") {
      searchFetchpets(searchQuery, currentPage);
    } else {
      Fetchpets(currentPage);
    }
  };

  useEffect(() => {
    if (firstcall) {
      Fetchpets(currentPage);
    }
  }, [petcard, firstcall]);

  return (
  <div className="home-page">
    <div className="hero-section">
        <div className="hero-section-content-wrapper">
        <img src={HeroImage} alt="heroimage" />
          <div className="hero-section-content-container">
          <h1>
            {/*   */}
          Adopt a Pet Today!
          </h1>
          <h2>
            {/* Adopt a new pet and <br /> change a life! */}
            Take action today and give<br /> 
            a pet the loving home they deserve. 
        </h2>
          
            {/* <div className="search-container"> */}
              <div className="search-for-animal">
                <button className="search-button" onClick={handleSeeMorePetsClick}>
                  {" "}
                  Find your new pet →{" "}
                </button>
              </div>
            {/* </div> */}
          </div>
        </div>
    </div>
      <div className="Featured-Content-wrapper">
      <div className="Featured-content-area">
        <div className="featured-title">
            <h1> 
              Featured Pets
            </h1>
            <p> 
            Discover your new furry friend with ease on our pet adoption website. Our featured section showcases adorable and adoptable pets, all of which are up-to-date on vaccinations and ready for a forever home. With our comprehensive database and filters, finding your perfect match has never been easier. Start your search today and find your new best friend!
            </p>
            <button className="See-more-Pets-Button" 
            onClick={handleSeeMorePetsClick}
            >See More Pets →</button>
        </div>
          <div className="featured-pets-section">
            {isLoading ? (
              <div className="loading">
                <CircularProgress size="lg" />
              </div>
            ) : petcard?.length > 0 ? (
            
              <div className="petcardcontainer">
                {petcard.map((petinfo, index) => (
                  <PetCard key={index} petinfo={petinfo} />
                ))}
              </div>
            ) : (
              <div className="empty">No pets found.</div>
            )}
            <div className="Pagination-Button-Area">
            <button
              className="pagination-button-1"
              onClick={() => {handlePrevPage();
                window.scrollTo(0,1100);}}
                disabled={currentPage === 1}
            >
            ←
            </button>
            <div className="pagination-counter">
            <h3> {currentPage}</h3>
          </div>
            <button
              className="pagination-button-2"
              onClick={() => {handleNextPage();
              window.scrollTo(0,1100);}}
            >
              →
            </button>
          </div>
          
        </div>
      </div>
      </div>
      <div className="Mission-statement-wrapper">
      <div className="Mission-statement">
        <div className="Mission-statement-image">
          <img src={shiba} alt="shiba icon" className="shiba-icon" />
        </div>
        <div className="Mission-statement-text">
        <h2>What we do</h2>
        <p>  At our pet adoption website, our goal is to connect adoptable pets
            with loving families and find them their forever homes. We work with
            reputable animal rescues and shelters to ensure that all of the pets
            on our website are healthy, up-to-date on vaccinations, and ready to
            join their new families. Our website provides a user-friendly
            platform that makes it easy for potential adopters to search for and discover their perfect pet.
            {/*  We believe that every pet deserves a
            loving home, and we are committed to making the adoption process as
            easy and enjoyable as possible for both pets and adopters. Join us
            in our mission to find homes for all these amazing animals by
            adopting your new furry friend today! */}
        </p>
        <button className="What-we-do-search-button" onClick={handleSeeMorePetsClick}>
                  {" "}
                  Find your new pet →{" "}
                </button>
        </div>
        
      </div>
      </div>
      <div className="Benefit-Wrapper">
        <div className="benefit-banner" id="bannerid">
            <div className="benefit">
              <img src={clock} alt="benefit-icon" className="benefit-icon" />
              <h1>Save Time</h1>
              <p>Instead of spending hours driving around to different shelters, you can browse through multiple pets available for adoption in one place. This saves time and energy while increasing your chances of finding the perfect pet.
              </p>
            </div>
            <div className="benefit">
              <img src={animalcarecolor} alt="benefit-icon" className="benefit-icon" />
            <h1>Save A Life</h1>
              <p>By adopting a pet from a shelter or rescue group, you are helping to save a life. Many pets in shelters are euthanized each year due to overcrowding, so adopting a pet can make a real difference.
              </p>
            </div>
            <div className="benefit">
              <img src={animalinformation} alt="benefit-icon" className="benefit-icon" />
            <h1>Convenient Access to Information</h1>
              <p>Pet adoption sites allow you to easily access information about pets available for adoption. You can filter pets by breed, age, and location to find the perfect match for you and your family.
              </p>
            </div>
        </div>
      </div>
  </div>
  );
};

export default Home;
