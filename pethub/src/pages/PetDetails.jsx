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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImY0MDFjZjQ1ZmFlZWRhYTY4ODdmY2FlYWM3YTE0NTI2YmQ2NTgzZmMwN2RlNmNmNDQwZmE0MGZkZWQ3NmIzMWRmZGFjMWMwNTRmYjM4ZGE5IiwiaWF0IjoxNjc4MjIxNzk4LCJuYmYiOjE2NzgyMjE3OTgsImV4cCI6MTY3ODIyNTM5OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ehD2EXrqcAOewZzKw3ikiRddEHKbdiJSU0RCYO9vttAV_y739mhT6uxML0gp_INr9Chi1OJwypZTdwyUyKr2YMY0YL86rQUhGT4UPQiFm0P6fU6vt_KHpTAjPBphqdGxbl_kHTq-vKqsMEFNg-mzorrz8Oxnfwrbnv-jJLImReXuKSNOkJllygMi-fQu6oqp94QspVw-ygIkugkEw-oV2pvvFiCGc9APYucH_clZUZw6R6ASPJbVQU7IWkJSQauSS9_1XHZ-tZdUxLfTVpWv_z04TVix6KwciIS28poY_qums50tbusTc_cFoqBto8kdGy_bE_Tgq2ZbLF0Ao8Gcpg",
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
