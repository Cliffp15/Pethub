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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJUUjhqVjg3NTl6aU82d1gxQ0pjUmRYWDN5WU9iWWNmZ1ZvUWt6UmhyMVlPbktmV0VtTSIsImp0aSI6ImEzYWM4Yzg0Y2Q2OGY0Yzg4MzJhNWQ1ZDZmNDZlOTkxN2ExNGVjZWI0ODdmZTNjMWQwOWU5ZDI3NTdmMWRjNzdhYTU2YzM2MjliNjZiMjk3IiwiaWF0IjoxNjc3Nzk2NzU1LCJuYmYiOjE2Nzc3OTY3NTUsImV4cCI6MTY3NzgwMDM1NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.H7vd_T9xDWBsUYy2EkwOLz7VhvMvN8O5Fp-BkxFE2zpu1ZOdNHMycAHhip_4qcFzm6T41u_ZgAumaGugt_swqH2eU9bplZQBprhcAuRMKrKlU8AkBANOABIXgUgzAl3NHrd7v3WTCvWKRc4W9x1V6LiKbmiPZcIeLe9T2PFBU4vNuslKTHurx90MtA0MIzTDCKpmyPYYJXT1jblyJPQHijzS7PMUAGn44ocM9AufDEC8ByabufsUffDg9oG0MRqh99sSZKeqEKG_LhfbzBVFPrG9Ph07i-isfFOI4duRk6xA_g88glpX7TsGSbQbEC1MpjZebWn9MaqEVaAOBVydxg",
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
      <h2 className="Breed&Age">
        {component.breeds.primary}, {component.age}
      </h2>
      <p>{component.description}</p>
    </div>
  );
};

export default ComponentDetails;
