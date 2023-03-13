import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./styles/PetDetails.css";
import { fetchToken } from "../api/petFinderToken";

const ComponentDetails = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let firstcall = true;

  //   useEffect(() => {
  //     fetch(`https://api.petfinder.com/v2/animals/${id}`)
  //       .then(response => response.json())
  //       .then(data => setComponent(data))
  //       .catch(error => console.error(error));
  //   }, [id]);

  const Fetchpets = async (animal) => {
    const token = await fetchToken();

    const response = await fetch(
      `https://api.petfinder.com/v2/animals/${id}?fields=description&format=full`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);
    console.log(data.animal);
    const fullDescription = data.animal.description.replace(/\.\.\.$/, "");
    data.animal.description = fullDescription;
    setComponent(data.animal);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (firstcall) {
      Fetchpets("dog");
      firstcall = false;
    }
  }, [id]);

  function handleAdoptClick() {
    if (isAuthenticated) {
      // TODO: Implement adoption functionality
    } else {
      // Redirect to sign up page if not authenticated
      navigate("/signup");
    }
  }

  if (!component) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-details-container">
      <div variant="outlined" className="component-details">
        <img
          className="pet-details-img"
          src={component.photos[0]?.medium}
          alt={component.name}
        ></img>
        <ul className="pet-details-list">
          {component.gender && (
            <li className="pet-details-li">{component.gender}</li>
          )}
          {component.size && (
            <li className="pet-details-li">{component.size}</li>
          )}
          {component.color && (
            <li className="pet-details-li">{component.color}</li>
          )}
          {component.breeds.primary && (
            <li className="pet-details-li">{component.breeds.primary}</li>
          )}
        </ul>
        <div className="pet-details-about">
          <h2 className="pet-details-about-heading">About {component.name}</h2>
          <ul className="pet-details-about-list">
            <li className="pet-details-about-li">Age: {component.age}</li>
            <li className="pet-details-about-li">
              Coat Length: {component.coat}
            </li>
            <li className="pet-details-about-li">
              House-trained: {component.attributes.house_trained ? "Yes" : "No"}
            </li>
            <li className="pet-details-about-li">
              Shots up to date:{" "}
              {component.attributes.shots_current ? "Yes" : "No"}
            </li>
            <li className="pet-details-about-li">
              Good with children:{" "}
              {component.environment.children ? "Yes" : "No"}
            </li>
            <li className="pet-details-about-li">
              Good with other dogs: {component.environment.dogs ? "Yes" : "No"}
            </li>
          </ul>
          {component.fee && (
            <p className="pet-details-about-fee">
              Adoption fee: ${component.fee.amount}
            </p>
          )}
        </div>
        <button className="adopt-button" onClick={handleAdoptClick}>
          Adopt {component.name}
        </button>
      </div>
    </div>
  );
};

export default ComponentDetails;
