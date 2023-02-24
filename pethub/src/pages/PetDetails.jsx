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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImI4MDQyZDczNTdjNTNlNzUyYTMwN2U4ODU0NWJlZTllMDRiNTBiYjA4OGYzMjFkMDU0OGRiOTRhOTc4M2E0YjRiYjljYzViYmM2MTMzNmExIiwiaWF0IjoxNjc3MTA2NjQ3LCJuYmYiOjE2NzcxMDY2NDcsImV4cCI6MTY3NzExMDI0Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.sNE8Mw4nWzsy14XbfdJQSaeswzCy5TbhjG4iShN2KCce_YqRD9dFKFcWmYKdHys6YlZb4AU4LBFOquCBOA9-PK45J9fNGO_qmtzb7bfPkLuAR1l4nKL0bZEIJvX7LLXDg_y07lldKstTrIWHJyXiDfp4c6e_vscIfp6CZwS-JvMfLwOYe7P1YH8dKVlYIG0FeUa8ZNvSLQiZRLrQbjcSKRC7VROlQelZ9CzMqGNZDJKAIv98OInbc7TEddv2CocnC8DVjrtpUbcR3eV7wHIid3uGI0_OS0srNcM8jGvjkACtcf281pxSDLYr08EidSyn74lNmcO3OuclNWbwZvBmiw"
      },
    });



    const data = await response.json();

    console.log(data);
    console.log(data.animal);
    setComponent(data.animal);
    console.log(component);
  };

  let firstcall = true;

  useEffect(() => {
    if (firstcall) {
      Fetchpets("dog");
      firstcall = false;
    }
  }, component);

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