import React from "react";
import HeroImage from "../photos/HeroImage.png"
import caticon from "../photos/cat.png"
import kitten from "../photos/kitten.jpg"
import heart from "../photos/heart.png"


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
          <div className="featuredpetimagesection">
            {/* Convert into component */}
            <div className="featuredpetimages">
              <div className="petimage"> 
                <img src={kitten} alt="kitten" />
              </div>
              <div className="peticon">
                <img src={caticon} alt="caticon" />
                </div>
                {/* <div className="favoritebutton">
                  <img src={heart} alt="caticon" />
                </div> */}
                <div className="petdetails">
                  <h1 className="Name">Mini</h1>
                  <h2 className="Breed&Age">Tabby, Young</h2>
                  {/* <h2 className="Age"></h2>                 */}
                  <h2 className="Gender">Female</h2>
                  <h2 className="location">New York, New York</h2>
                </div> 
            </div>
             {/* Convert into component */}
          </div>
      </div>
    </div>
  );
};

export default Home;