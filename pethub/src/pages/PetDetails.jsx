import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/PetDetails.css";
import { Card } from "@mui/material";
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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6IjRiYWRjN2VkZjQ2YjJjM2I2Y2M0NGI3Njk2MjQ4ZDVlMmM1YzRkMjdjZTRjMDcwZTVkM2U2MGIwZTc5ZDJhYjA2NzQ4YjljYzI3OWFmYzNlIiwiaWF0IjoxNjc4MDYwNDk1LCJuYmYiOjE2NzgwNjA0OTUsImV4cCI6MTY3ODA2NDA5NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.HtHPKatWm45vVNekrMp4ZYjm0zchMEXuRnMo6wj3sUXpGZLJymI8FViZglxoMqvA-8O-KIPm6SVw1SUpV4UfSWZvvQjtjmkrPxNbMumT06JJUILGfBiBHzY6ACf_BcKNTUW8S_qKvpCW7AkwWPj5f_GO5KwGOXXbVE5pkab_E0aA9bt4jedbpzgyevMSmpPPGe0geX8F87gPNhWe2B142wW98TCCFvywmV-IjbN-Fc3yaUZ5D8vJuEnLpjNjwesSkxVQpqEoZ1-6LoGaL5mR8QKvWmhkUjpmOq_GbXLuXm-7l21QrHlQH6LMPO4JAwR4CUSD08CjS3EwqR8DQV0U7g",
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
      </div>
    </div>
  );
};

export default ComponentDetails;
