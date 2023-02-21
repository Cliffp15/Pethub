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
const API_URL = "https://api.petfinder.com/v2/animals?type=";

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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6ImZhZmIwOTNkY2Q2ZDk0YjRlYmU5OWU2MDEzMzg2MjhlOGViZmE5OTVhNzY1ZjQ3OWU5YzAzZDE1ZGJhYjBhNTNiZDc5NjJlYmQ5NDc4ZjY2IiwiaWF0IjoxNjc2NTkzNDAxLCJuYmYiOjE2NzY1OTM0MDEsImV4cCI6MTY3NjU5NzAwMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.SSP4SNmQMdhLtPVdUL8V3XfOMS7TIGTWo-DtCi4kkai63YsIe-2o3HFFnNOtaGmpDGF9tchPoLJhj-qUwuGzmJXg_TwnjWx9x2xeWf9reFJGSLmBjks4G0yc-lWd47zlL31GR6IViqyvS9DxlYbg5N0tG5UqXaesGweeK6hxqjxuA4_ORfO6w85ubZORuFkHxxEJrsOCMX9y1vgdpR27rKt3RMWV_bKaMDjN8QBggrc73AIKAXHkxHoSkrNpdv2F6BXNwWbo3oxisQW8TXZUKL55B5Q8h1S_r1wskZAu0OdFfPd6gVhJOmrsV7Tk-5ci2ryP6Flt4PiWqt36Kwi9FA",
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
        <div className="search-container">
          <div className="search-for-animal">
            <input placeholder="City" type="text" id="cityinput" />
            {/* create a dropdown for state */}
            <input placeholder="State" type="text" id="stateinput" />
            <input placeholder="Animal" type="text" id="animalinput" />
            <input placeholder="Breed" type="text" id="breedinput" />
            <button className="search-button"> Search </button>
          </div>
        </div>
      </div>
      <div className="featured-section">
        <h1 className="featured-banner">Featured Pets</h1>
        {petcard?.length > 0 ? (
          <div className="pet-card-container">
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
