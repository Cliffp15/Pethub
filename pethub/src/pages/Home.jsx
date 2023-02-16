import React from "react";
import { useState, useEffect } from "react";
import "../home.css";
import HeroImage from "../photos/HeroImage.png"
// import heart from "../photos/heart.png"
import PetCard from '../components/PetImageSelection';


// const petinfo = {
//   "id": "59898188",
//   "name" : "Perla Ann",
//   "breeds": "Maltese",
//   "age": "Adult",
//   "gender": "Female",
//   "city": "Beverely Hills",
//   "state": "CA",
//   "photos": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/59896949/1/?bust=1675968845&width=100"
// }

// const search = () => {} 

// const cityinput = document.getElementById("cityinput").value;
// const stateinput = document.getElementById("stateinput").value;
// const animalinput = document.getElementById("animalinput").value;
// const breedinput = document.getElementById("breedinput").value;

//   const params = URLSearchParams({
//   types: animalinput, 
//   breeds: breedinput,
//   city: cityinput,
//   state: stateinput
// });


// const API_URL = 'https://api.petfinder.com/v2/animals?type='
const API_URL = 'https://api.petfinder.com/v2/animals'

const Home = () => { 

  let firstcall = true;
  const [petcard, setpetcard] = useState([]);

  const Fetchpets = async (animal) => {
      const response = await fetch(`${API_URL}${animal}`,{
        method: 'GET',
        mode: 'cors',
        headers:{ 
          'Accept': 'application/json',
          'Content-type': 'application/json',
          //Bearer token needs to be updated every hour for access to api
          // or it will produce 401 Error
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6ImI5MDI0YTJjNDQ0Y2QwZDEwMTI2NGU2YjY4NzRkZTc2N2M3NDdlMWY1MGRlMDRiZjFiMWEwNjJhOTgxZmU4ODcxZjljZWVmN2YzNGNjNzdiIiwiaWF0IjoxNjc2NTg5NTc4LCJuYmYiOjE2NzY1ODk1NzgsImV4cCI6MTY3NjU5MzE3OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.c5bU7SFW-XqSkNtmTGbx_Oozec6_59S7kT2S3xZxW04gK4JZlKC7Rzqcc988Q5eMW63FRx26T8a-m4R8eSJ_BDx-ZtbpkQUz4C3ebSJqThgtoWY5WHA782V2am-UHwB6EXWbZDyIyHrcelF-7ZWH1w6mGSdkcL0Wtkr9ULAAiheKsmbbiWO-Rd-7_4l1hthB_NBo2QkxknXwdFg1FrTV-GdRllpYKYcwSNFIIUuyX56lc1MD4f_381heZcotdOFhtMPyY8obbZsA7zwNboS04t0VpybOsPjZdtCrdLnoWZv2EDE-FHPR2Y4NGDIMUerists-R-GolnnoqGtylLPMUA' 
        }
      });
      const data = await response.json();

      // const {name, age, breeds, photos, gender }=data.animals[0];
      // document.getElementById('photoid').textContent = photos[0]?.small;
      // document.getElementById('nameid').textContent = name;
      // document.getElementById('ageid').textContent = age;
      // document.getElementById('breedsid').textContent = breeds.primary;
      // document.getElementById('genderid').textContent = gender;
      // console.log(photos);
      // console.log(name);
      // console.log(age);
      // console.log(breeds.primary);
      // console.log(gender);


      console.log(data);
      console.log(data.animals);
      console.log(data.animals[0]);
      console.log(data.pagination);
      // console.log(data.name);
      setpetcard(data.animals);
      console.log(petcard); 
    }; 

  

  useEffect(() => {
    if(firstcall ){
      Fetchpets('');
      firstcall = false;
    }
  }, petcard);


  return (
    <div>
      <div className="herosection">
        <img src={HeroImage} alt="heroimage"/> 
        <h1>Find the purrfect pet for you!</h1>
        <div className="searchforanimal">
          <input placeholder="City" type="text" id="cityinput"/>
          {/* create a dropdown for state */}
          <input placeholder="State" type="text" id="stateinput"/>
          <input placeholder="Animal" type="text" id="animalinput"/>
          <input placeholder="Breed" type="text" id="breedinput"/>
          <button className="searchbutton"> Search </button>
        </div>
      </div>
      <div className="featuredsection">
        <h1 className="featuredbanner">Featured Pets</h1>
        {
          petcard?.length > 0
          ? (
              <div className="petcardcontainer">
              {petcard.map((petinfo, index ) => ( 
                <PetCard key={index} petinfo={petinfo} />
               ))} 
             </div>
          ) : (
            <div className="empty">
              <h2> <span>No pet found. <br />Hint: Make sure API key/Authorization is up to date </span> </h2>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;