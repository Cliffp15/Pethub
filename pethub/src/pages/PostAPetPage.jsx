import React, { useState, useEffect } from "react";
import axios from "axios";
import csc from "country-state-city"

const AdoptionPage = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state,setState] = useState("");
  const [zip, setZip] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const [petBreeds, setPetBreeds] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (animal === "dog") {
          response = await axios.get("https://dog.ceo/api/breeds/list/all");
          setPetBreeds(Object.keys(response.data.message));
        } else if (animal === "cat") {
          response = await axios.get("https://api.thecatapi.com/v1/breeds");
          setPetBreeds(response.data.map((breed) => breed.name));
        }
        else{
          setPetBreeds([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (animal) {
      fetchData();
    }
  }, [animal]);



  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("description", description);
    formData.append("city",city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("animal", animal);
    formData.append("breed", breed);
    formData.append("age", age);

    axios
      .post("http://localhost:3001/postapet", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
   }; 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Post a Pet</h1>
        <img src={imageUrl}></img>
        <div>
          <input id="image" type="file" onChange={handleImageChange} />
        </div>
        <h2>Animal</h2>
        <div>
          <label>
            Animal type:
            <select value={animal} onChange={(e) => setAnimal(e.target.value)}>
              <option default>Select</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Animal breed:
            <select value={breed} onChange={(e) => setBreed(e.target.value)}>
              {petBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <label>
            Age:
            <input
              placeholder="Age"
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </label>
        </div>
        <h2>Location</h2>
        <div>
          <label>
            City:
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></select>
          </label>
          <label>
            State:
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></select>
          </label>
          <label>
            Zip:
            <input
              placeholder="Zip"
              type="text"
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            ></input>
          </label>
        </div>
        <h2>Description</h2>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
  
}
export default AdoptionPage;