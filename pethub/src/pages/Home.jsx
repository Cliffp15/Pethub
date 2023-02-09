import React from "react";
import { useState, useEffect } from "react";
import "../home.css";
import HeroImage from "../photos/HeroImage.png"
// import heart from "../photos/heart.png"
import PetCard from '../components/PetImageSelection';




const API_URL = 'https://api.petfinder.com/v2/animals?type='

const petinfo = {
  //array element 18 through dogs in api
  "id": "59898188",
  "name" : "Perla Ann",
  "breeds": "Maltese",
  "age": "Adult",
  "gender": "Female",
  "city": "Beverely Hills",
  "state": "CA",
  "photos": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/59896949/1/?bust=1675968845&width=100"
  // "contact": "Mundelein"
}

const Home = () => { 
  let firstcall =true;
  const [petcard, setpetcard] = useState([]);

  const Searchforpets = async (animal) => {
      const response = await fetch(`${API_URL}${animal}`,{
        method: 'GET',
        mode: 'cors',
        headers:{ 
          'Accept': 'application/json',
          'Content-type': 'application/json',
          //Bearer token needs to be updated every hour for access to api
          // or it will produce 401 Error
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6IjEwNjhlYTFkMGQ0NTBiMGZiNjFkNzVjMGQwZTg4ZjQzNzRkMzE5NjBiNDY3ZDc5MmZlYWM5OTBjYzkyMTY5ZTk2OWY0ZDRlM2JhZjQ0ZGEzIiwiaWF0IjoxNjc1OTgxNTMxLCJuYmYiOjE2NzU5ODE1MzEsImV4cCI6MTY3NTk4NTEzMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.TrF7g3yaKhAG0G2k2ciXwllx0Jas4eUq7pk2mf3ptu-Ic_kevS6bluZ8BJQQ3xgf9u9EptxccqW3Mb8Kno3tcurJik6CJAOKo3sapPiMs-Bmzz6j8AIsr8DpNSZpTez5rlHiy4UN8C_rWeZnOlUfZzhJqw_K7zdm8WcJKYIQzPLAC8Web_WSxMPHPDySbkl8T6kf9OvzzStFrmM6C2p9nnQJMgU2WdcP21Sucvsn9x7LLOC0CjwCYKrpNQ20KqV5DQD4DxK3LuJfTRisyUH6nT0EefKcNeMAMGui0GGy7pY4bsvM4nrpIUCU89SMVRLVYnJhTGRttwkjtLrg-bhH-Q' 
        }
      });
      const data = await response.json();

       const {name, age, breeds, photos, gender }=data.animals[0];
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
      Searchforpets('dog');
      firstcall = false;
    }
  }, petcard);

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
              <h2>No pet found</h2>
            </div>
          )
        }
          
      </div>
    </div>
  );
};

export default Home;