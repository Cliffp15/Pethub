import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchToken } from "../api/petFinderToken";
import Share from "../components/Share";
import WebShare from "../components/WebShare";

const ComponentDetails = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);

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
    if (firstcall) {
      Fetchpets("dog");
      firstcall = false;
    }
  }, [id]);

  if (!component) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-details-container">
      <div variant="outlined" className="component-details">
        <img
          className="pet-details-img"
          src={component.photos[0]?.medium}
        ></img>
        <h2 className="pet-details-header">{component.name}</h2>
        <img src={component.imageUrl} alt={component.title} />
        <h2 className="breed-age">
          {component.breeds.primary}, {component.age}
        </h2>
        <p className="pet-details-para">{component.description}</p>
        <Share />
        <WebShare url={window.location.href} title={component.name} text={component.description} />
     
      </div>
    </div>
  );
};

export default ComponentDetails;
