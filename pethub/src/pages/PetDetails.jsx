import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchToken } from '../api/petFinderToken';

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
        Authorization: `Bearer ${token}`
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
    <div className="component-details">
      <img src={component.photos[0]?.medium}></img>
      <h2>{component.name}</h2>
      <img src={component.imageUrl} alt={component.title} />
      <h2 className="Breed&Age">{component.breeds.primary}, {component.age}</h2>
      <p>{component.description}</p>
    </div>
  );
};

export default ComponentDetails;
