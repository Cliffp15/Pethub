import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ComponentDetails = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);

//   useEffect(() => {
//     fetch(`https://api.petfinder.com/v2/animals/${id}`)
//       .then(response => response.json())
//       .then(data => setComponent(data))
//       .catch(error => console.error(error));
//   }, [id]);

  const Fetchpets = async () => {
    const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        //Bearer token needs to be updated every hour for access to api
        // or it will produce 401 Error
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6IjJhZmRiZDMzODVlNzY2NmJkZjA4NGIxYzFlZmZkMThmZjJhZWE3MWVhMWE2MGY0MzRjMDRhZjQ2NTZjZWZiOTJkM2QyODBhZWY5Y2E4OWUwIiwiaWF0IjoxNjc3MDEyOTM0LCJuYmYiOjE2NzcwMTI5MzQsImV4cCI6MTY3NzAxNjUzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.IWqBFmQMT1PSNUjYJywPG1X2Q8pJLrKh_bWgyGMFKh0ILxrJk_tRCuNodtFPlH0qy7ZwvSM41vAscVvwfdsthQxR-o3Oc5vf540fOLsRY_jqOtyXbo9-N_aeCdT-X_IguRp8wZRWSbX2XcwxAnWchaUqyn0E-n8OicaRz0o4-RTpyWzlS7g67NsD31znuPePJaPmNkXJv4fQf3oFGOHH_071-hNLdgbeYnAG9b5vtmkOUhIl25-7ynec7jfBvDzDokMKDiV3ooq8-VpJT8Ajp85iPs4eMbcTBWvyiD_1nZTDje3AYk32tdmB-tzvq1KWY7etYqcRXm0Snb5FQkVqdA"
      },
    });

    const data = await response.json();

    console.log(data);
    console.log(data.animal);
    setComponent(data.animal);
    console.log(component);
  };

  useEffect(() => {
    Fetchpets();
  });

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