import React from "react";
import HeroImage from "../photos/HeroImage.png";
import caticon from "../photos/cat.png";
import kitten from "../photos/kitten.jpg";
import heart from "../photos/heart.png";
import "./styles/homepage.css";
import { useState, useEffect } from "react";

// import heart from "../photos/heart.png"
// import PetCard from "../components/PetImageSelection";

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
      </div>
      <div className="search-for-animal">
        <input className="input" placeholder="City" type="text" />
        <input className="input" placeholder="Animal" type="text" />
        <input className="input" placeholder="Breed" type="text" />
        <button className="search-button"> Search </button>
      </div>

      <div className="featured-section">
        <h1 className="featured-banner">Featured Pets</h1>
        <div className="featured-pet-image-section">
          <div className="featured-pet-image">
            <div className="pet-image">
              <img src={kitten} alt="kitten" />
            </div>
            <div className="pet-icon">
              <img src={caticon} alt="caticon" />
            </div>
            <div className="pet-details">
              <h1 className="name">Mini</h1>
              <h2 className="breed-age">Tabby, Young</h2>
              <h2 className="gender">Female</h2>
              <h2 className="location">New York, New York</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
