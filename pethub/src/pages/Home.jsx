import React from "react";
import HeroImage from "../photos/HeroImage.png";
import caticon from "../photos/cat.png";
import kitten from "../photos/kitten.jpg";
import heart from "../photos/heart.png";
import "./styles/homepage.css";
import { useState, useEffect } from "react";

// import heart from "../photos/heart.png"
import PetCard from "../components/PetImageSelection";


const API_URL = "https://api.petfinder.com/v2/animals?type=";



  
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
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6ImRlODgwMGVhN2ZiZDNkOTY0ZGYwNjcwNTllNTMxOWU0YmI2YWRkMWY5Zjc3ODBiM2VhYjI4NTE0YTBhM2Y3YTMwNjZjZGNlYjNmNTA5YmFiIiwiaWF0IjoxNjc3NzA0OTg1LCJuYmYiOjE2Nzc3MDQ5ODUsImV4cCI6MTY3NzcwODU4NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.v8UMID4d8t8EOzE4kIM7ggNB86rfrdtcyrPx3m4b9TqymXs6N_8UHYCr6iYQ9FjnpBZXizg3MmhZG1GjOO4cpiggaO8k7UrFiqxOG1Lb6Spud4cBtifC1W7t54S5vKvTiP3cqf19Q5OJ1wyTvaxcgueu5NRvMLqS_ZU0AFLdoba2JdlS4vLm7_FOmFn08VzldsUuhqrzTgezpXK9Eh0laWS5DrtTBMiwHYql1RIV4wlQrRzDNOE5mdjFJSUhBGjOR8mqDilfE2zFyDZPbs6gXf59Jl9O8pfCyT3hFHFlE_Kpj6az8aplfj9Emrxjai0tn01WVz_xTpr9SLbGfa_1HA'
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
  

const SearchPets=async () =>{
    // debugger;

// const cityinput = document.getElementById("cityinput").value;
const zipcodeinput = document.getElementById("zipcodeinput").value;
// const stateinput = document.getElementById("stateinput").value;
const animalinput = document.getElementById("animalinput").value;
const breedinput = document.getElementById("breedinput").value;

Fetchpets(`${animalinput}&breed=${breedinput}&location=${zipcodeinput}`);
}

useEffect ( () => {
  if (firstcall) {
    Fetchpets("");
  }
}, [petcard, firstcall]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={HeroImage} alt="heroimage" />
        <h1>Find the purrfect pet for you!</h1>

        <div className="search-for-animal">
          {/* <input placeholder="City" type="text" id="cityinput" /> */}
          <input placeholder="Zip Code" type="text" id="zipcodeinput" />
          {/* create a dropdown for state */}
          {/* <input placeholder="State" type="text" id="stateinput" /> */}
          <input placeholder="Animal" type="text" id="animalinput" />
          <input placeholder="Breed" type="text" id="breedinput" />
          <button className="searchbutton" onClick={SearchPets}> Search </button>
          
        </div>
      </div>
      <div className="featured-section">
        <h1 className="featured-banner" id="bannerid">Featured Pets</h1>
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
