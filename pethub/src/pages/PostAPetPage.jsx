import React, { useState, useEffect } from "react";
import axios from "axios";
import { City, State } from "country-state-city";
import "./styles/PostAPet.css";
import { makeStyles } from "@material-ui/core/styles";
import background from "../photos/cartoonBackground.jpg";

const States = require("us-state-converter");
const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
  },
}));

const AdoptionPage = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [description, setDescription] = useState("");
  const [petName, setPetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [color, setColor] = useState("");

  const [petBreeds, setPetBreeds] = useState([]);
  const [cities, setCities] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (species === "dog") {
          response = await axios.get("https://dog.ceo/api/breeds/list/all");
          setPetBreeds(Object.keys(response.data.message));
        } else if (species === "cat") {
          response = await axios.get("https://api.thecatapi.com/v1/breeds");
          setPetBreeds(response.data.map((breed) => breed.name));
        } else {
          setPetBreeds([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (species) {
      fetchData();
    }
  }, [species]);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCities(City.getCitiesOfState("US", States.abbr(e.target.value)));
  };

  const handleImageChange = (e) => {
    let newImages = [...imageUrl];
    for (let i = 0; i < e.target.files.length; i++) {
      if (newImages.length < 5) {
        newImages.push(URL.createObjectURL(e.target.files[i]));
      }
    }
    setImageUrl(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("description", description);
    formData.append("name", petName);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("species", species);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("sex", sex);
    formData.append("petName", petName);
    formData.append("color", color);

    console.log(...formData);

    axios({
      method: "post",
      url: "http://localhost:3001/postapet",
      data: formData,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Pet posted sucessfully");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        alert("An error occurred. Please try again.");
      });
  };
  return (
    <div className={classes.root}>
      <div className="post-a-pet-page">
        <div class="adoption-tips">
          <h2 class="adoption-tips-heading">Tips for Posting Your Pet</h2>
          <ul class="adoption-tips-list">
            <li class="adoption-tips-item">
              Include high-quality photos of your pet from different angles and
              in different settings to showcase their personality.
            </li>
            <li class="adoption-tips-item">
              Provide as much detail as possible about your pet's behaviors,
              habits, and medical history to help potential adopters make an
              informed decision.
            </li>
            <li class="adoption-tips-item">
              Be honest about any challenges or issues your pet may have, such
              as separation anxiety or a history of aggression, but also
              highlight their positive qualities and unique traits.
            </li>
            <li class="adoption-tips-item">
              Describe how your pet interacts with other animals, including
              whether they get along with other pets or prefer to be the only
              pet in the household.
            </li>
            <li class="adoption-tips-item">
              Consider creating a video of your pet to showcase their
              personality and help potential adopters get a better sense of
              their energy level and temperament.
            </li>
            <li class="adoption-tips-item">
              Be responsive to inquiries and provide additional information and
              photos as needed to help potential adopters make an informed
              decision.
            </li>
            <li class="adoption-tips-item">
              Ask potential adopters about their lifestyle and living situation
              to ensure that your pet will be a good fit for their home and
              family.
            </li>
            <li class="adoption-tips-item">
              Provide resources and support to the adopter after the adoption,
              such as training tips or recommendations for veterinary care.
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="adoption-form">
          <div className="adoption-form-grid">
            <div className="adoption-form-section-one">
              <h2 className="adoption-form-heading">Animal</h2>
              <div className="adoption-form-fields">
                <label className="adoption-form-field">
                  Name:
                  <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="adoption-form-field-input"
                  ></input>
                </label>
                <label className="adoption-form-field">
                  Species:
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="adoption-form-field-input"
                  >
                    <option default>Select</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="adoption-form-field">
                  Breed:
                  <select
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="adoption-form-field-input"
                  >
                    {petBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed.charAt(0).toUpperCase() + breed.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="adoption-form-field">
                  Age:
                  <input
                    placeholder="Age"
                    type="text"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="adoption-form-field-input"
                  ></input>
                </label>

                <label className="adoption-form-field">
                  Sex:
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="adoption-form-field-input"
                  >
                    <option default>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>

                <label className="adoption-form-field">
                  Color:
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="adoption-form-field-input"
                  >
                    <option default>Select</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="brown">Brown</option>
                    <option value="gold">Gold</option>
                    <option value="cream">Cream</option>
                    <option value="grey">Grey</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="adoption-form-section-two">
              <h2 className="adoption-form-heading">Location</h2>
              <div className="adoption-form-fields">
                <label className="adoption-form-field">
                  State:
                  <select
                    value={state}
                    onChange={handleStateChange}
                    className="adoption-form-field-input"
                  >
                    <option>Select a state</option>
                    {State.getStatesOfCountry("US").map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="adoption-form-field">
                  City:
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="adoption-form-field-input"
                  >
                    <option>Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="adoption-form-field">
                  Zip:
                  <input
                    placeholder="Zip"
                    type="text"
                    id="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="adoption-form-field-input"
                  ></input>
                </label>
              </div>
              <h2 className="adoption-form-heading">Description</h2>
              <label className="adoption-form-field">
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="adoption-form-field-textarea"
                ></textarea>
              </label>
              <div className="adoption-form-image">
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="adoption-form-image-input"
                />
                {imageUrl.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="adoption-form-image-preview"
                  />
                ))}
              </div>
              <div className="adoption-form-fields"></div>
              <button type="submit" className="adoption-form-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdoptionPage;
