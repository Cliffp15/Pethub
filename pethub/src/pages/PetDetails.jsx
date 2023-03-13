import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./styles/PetDetails.css";
import { fetchToken } from "../api/petFinderToken";

const ComponentDetails = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     fetch(`https://api.petfinder.com/v2/animals/${id}`)
  //       .then(response => response.json())
  //       .then(data => setComponent(data))
  //       .catch(error => console.error(error));
  //   }, [id]);

  const Fetchpets = async (animal) => {
    const token = await fetchToken();

    const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);
    console.log(data.animal);
    setComponent(data.animal);
  };

  let firstcall = true;

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
        <h2 className="pet-details-header">{component.name}</h2>
        <img src={component.imageUrl} alt={component.title} />
        <h2 className="breed-age">
          {component.breeds.primary}, {component.age}
        </h2>
        <p className="pet-details-para">{component.description}</p>
        <button className="adopt-button" onClick={handleAdoptClick}>
          Adopt {component.name}
        </button>
      </div>
    </div>
  );
};

export default ComponentDetails;
