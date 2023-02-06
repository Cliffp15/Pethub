import React from "react";
import HeroImage from "../photos/HeroImage.png"


const Home = () => {
  return (
    <div>
      <div className="herosection">
        <img src={HeroImage} alt="heroimage"/> 
        <h1>Find the purrfect pet for you!</h1>
        <div className="searchforanimal">
          <input placeholder="City" type="text"/>
          <input placeholder="Animal" type="text"/>
          <input placeholder="Breed" type="text"/>
          <button className="searchbutton"> Search </button>
        </div>
      </div> 
      <div className="featuredsection">
        <h1 className="featuredbanner">Featured Pets</h1>
     
      </div>
    </div>
  );
};

export default Home;