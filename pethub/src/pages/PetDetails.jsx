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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6VXdsUUxkYnB3eUZhbHpCQ1dFZVl5aWpKS1JPOVl6WndzQWtCQ0VBR25LUmFQTjM0YiIsImp0aSI6ImM2NzliMDFmMTg3MGQ0ODFmMmMzOTZkYmNkNzEzMDJiOTc5Zjg2OTMxY2NkYThkYWYxZThkZjJhZjU0MmNjODcwNzZhZGQ5ODdjNzIwZTM3IiwiaWF0IjoxNjc3MjEzMjk3LCJuYmYiOjE2NzcyMTMyOTcsImV4cCI6MTY3NzIxNjg5Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.jyT9Ahf3lk44w2BnLMLCS0vnxWYDIntPPusP1PVvwfAdooi_wA95SJ2_36I97tyjd08MxvnQ-c2BOsamdJq0hJhIQhVGhVrYruqhlgC-WZZy9O2fghY15tG2TpuUIfNCidug-y3jSaramtlJnwh3f97VjQO0eIwryQWJTBU8-GxWDeKuLzPvULKE9QZ1bjx9KIHcljYcX1LIk8sBcceILGnaF9KpOcx6wSMzAy6_w08_2WUYCVonxydfYj28Q5Fn6mnpsAM8rowpKAdOU3_QWJqmHawy5d3u80cRnu_uD_uaKRAhTSjAk93Y13pebMDmlfwUEyhTzJYpKOm-39EJ7A"
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