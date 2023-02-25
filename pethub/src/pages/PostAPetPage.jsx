import React, { useState, useEffect } from "react";
import axios from "axios";
import { City, State} from "country-state-city";
import "./styles/PostAPet.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { City, State } from "country-state-city";
// import "./styles/PostAPet.css";

// const States = require("us-state-converter");

// const AdoptionPage = () => {
//   const [imageUrl, setImageUrl] = useState([]);
//   const [description, setDescription] = useState("");
//   const [petName, setPetName] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zip, setZip] = useState("");
//   const [species, setSpecies] = useState("");
//   const [breed, setBreed] = useState("");
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
//   const [color, setColor] = useState("");

//   const [petBreeds, setPetBreeds] = useState([]);
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response;
//         if (species === "dog") {
//           response = await axios.get("https://dog.ceo/api/breeds/list/all");
//           setPetBreeds(Object.keys(response.data.message));
//         } else if (species === "cat") {
//           response = await axios.get("https://api.thecatapi.com/v1/breeds");
//           setPetBreeds(response.data.map((breed) => breed.name));
//         } else {
//           setPetBreeds([]);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (species) {
//       fetchData();
//     }
//   }, [species]);

//   const handleStateChange = (e) => {
//     setState(e.target.value);
//     setCities(City.getCitiesOfState("US", States.abbr(e.target.value)));
//   };

//   const handleImageChange = (e) => {
//     let newImages = [...imageUrl];
//     for (let i = 0; i < e.target.files.length; i++) {
//       if (newImages.length < 5) {
//         newImages.push(URL.createObjectURL(e.target.files[i]));
//       }
//     }
//     setImageUrl(newImages);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", imageUrl);
//     formData.append("description", description);
//     formData.append("name", petName);
//     formData.append("city", city);
//     formData.append("state", state);
//     formData.append("zip", zip);
//     formData.append("species", species);
//     formData.append("breed", breed);
//     formData.append("age", age);
//     formData.append("sex", sex);
//     formData.append("petName", petName);
//     formData.append("color", color);

//     console.log(...formData);

//     axios({
//       method: "post",
//       url: "http://localhost:3001/postapet",
//       data: formData,
//       headers: { "Content-Type": "application/json" },
//     })
//       .then(function (response) {
//         //handle success
//         console.log(response);
//         alert("Pet posted sucessfully");
//       })
//       .catch(function (response) {
//         //handle error
//         console.log(response);
//         alert("An error occurred. Please try again.");
//       });
//   };
//   return (
//     <form onSubmit={handleSubmit} className="adoption-form">
//       <div className="adoption-form-section">
//         <div className="adoption-form-image">
//           <input
//             type="file"
//             multiple
//             onChange={handleImageChange}
//             className="adoption-form-image-input"
//           />
//           {imageUrl.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt=""
//               className="adoption-form-image-preview"
//             />
//           ))}
//         </div>
//         <h2 className="adoption-form-heading">Animal</h2>
//         <div className="adoption-form-fields">
//           <label className="adoption-form-field">
//             Name:
//             <input
//               placeholder="Name"
//               type="text"
//               id="name"
//               value={petName}
//               onChange={(e) => setPetName(e.target.value)}
//               className="adoption-form-field-input"
//             ></input>
//           </label>
//           <label className="adoption-form-field">
//             Species:
//             <select
//               value={species}
//               onChange={(e) => setSpecies(e.target.value)}
//               className="adoption-form-field-input"
//             >
//               <option default>Select</option>
//               <option value="dog">Dog</option>
//               <option value="cat">Cat</option>
//               <option value="other">Other</option>
//             </select>
//           </label>
//           <label className="adoption-form-field">
//             Breed:
//             <select
//               value={breed}
//               onChange={(e) => setBreed(e.target.value)}
//               className="adoption-form-field-input"
//             >
//               {petBreeds.map((breed) => (
//                 <option key={breed} value={breed}>
//                   {breed.charAt(0).toUpperCase() + breed.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label className="adoption-form-field">
//             Age:
//             <input
//               placeholder="Age"
//               type="text"
//               id="age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="adoption-form-field-input"
//             ></input>
//           </label>

//           <label className="adoption-form-field">
//             Sex:
//             <select
//               value={sex}
//               onChange={(e) => setSex(e.target.value)}
//               className="adoption-form-field-input"
//             >
//               <option default>Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </label>

//           <label className="adoption-form-field">
//             Color:
//             <select
//               value={color}
//               onChange={(e) => setColor(e.target.value)}
//               className="adoption-form-field-input"
//             >
//               <option default>Select</option>
//               <option value="black">Black</option>
//               <option value="white">White</option>
//               <option value="brown">Brown</option>
//               <option value="gold">Gold</option>
//               <option value="cream">Cream</option>
//               <option value="grey">Grey</option>
//               <option value="mixed">Mixed</option>
//             </select>
//           </label>
//         </div>
//         <h2 className="adoption-form-heading">Location</h2>
//         <div className="adoption-form-fields">
//           <label className="adoption-form-field">
//             State:
//             <select
//               value={state}
//               onChange={handleStateChange}
//               className="adoption-form-field-input"
//             >
//               <option>Select a state</option>
//               {State.getStatesOfCountry("US").map((state) => (
//                 <option key={state.id} value={state.name}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label className="adoption-form-field">
//             City:
//             <select
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="adoption-form-field-input"
//             >
//               <option>Select a city</option>
//               {cities.map((city) => (
//                 <option key={city.id} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label className="adoption-form-field">
//             Zip:
//             <input
//               placeholder="Zip"
//               type="text"
//               id="zip"
//               value={zip}
//               onChange={(e) => setZip(e.target.value)}
//               className="adoption-form-field-input"
//             ></input>
//           </label>
//         </div>
//         <h2 className="adoption-form-heading">Description</h2>
//         <div className="adoption-form-fields">
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="adoption-form-field-textarea"
//           ></textarea>
//         </div>
//         <button type="submit" className="adoption-form-button">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };
// export default AdoptionPage;
