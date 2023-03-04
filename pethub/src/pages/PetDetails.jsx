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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImY4MjVjMTUzM2I4M2IxNTZiMDc0ODdmZmI0NDlkZTdmMTU1ZjdhMjBkYzZhMjExMmRhMTkxZDFiMWY0YWU0Njc4OGE3ZmZmNWE4NWM3NjhhIiwiaWF0IjoxNjc3OTUwNDg0LCJuYmYiOjE2Nzc5NTA0ODQsImV4cCI6MTY3Nzk1NDA4NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.a54ixVwnIbNlylxLTRB4pcWpd01njPeo1RSsynD40BUv4PZhA7Lp2XfGEJG6SVuXmQx2eed_7dVk4-ChaaIpKdMCiV-tqrnt5fZu7ipJrgF87a0F694CfUFGlo78lmqPPImd86GOcjCgO70tVXj6y_oyVjyR_GYk412Z0PfiOJ_NRRWtVB8z_NkgZOIrz_lH9C1H4WtPqxAxzAu1OxWYXULydK7GEM043LhF-t4soo3BsIyXA0rB09SKAswsdZZ2dPKati3T4uEDjIKj6NACGVUy0Lj6G7CYiOnsUu546CgamyGyF4jceNk8Q7tXzXi2oATtcN93dcwoeHnc8jyf5g",
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
