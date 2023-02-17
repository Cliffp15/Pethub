import React from "react";
import HeroImage from "../photos/HeroImage.png";
import caticon from "../photos/cat.png";
import kitten from "../photos/kitten.jpg";
import heart from "../photos/heart.png";
import "./styles/homepage.css";

const Home = () => {
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
