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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyRURlcDRuVW5abGRmS21FVUc4ajNZSmxKY01HM2RBbFVaVUE4SUplUkE0QnZiSjR6OSIsImp0aSI6IjBhYzgzMWIwZGMyYjc0MjVkOTljOWZjMjYxOTBiNTMxMmJlNDNmMjkyZGU0MmJhYzMwZjVjYTQ4YmMwNjgwNGM5MDM5NjczMzg0OGRiMGUxIiwiaWF0IjoxNjc3NjM2Nzc0LCJuYmYiOjE2Nzc2MzY3NzQsImV4cCI6MTY3NzY0MDM3NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Vgn_V1TgxDAgEbCBCTm4kRmSqFxHxlyy0Kl_5Xobahzqe7mBIdkZDfqQ9mk7AylsbdsLbe_lpCvLv970-lalSfsg2vn72st6ibRbqueaTrx_MAPzxgA_2KoZzUJBHbYTa4YkBpf-OcBzCUFByw-Fjmt9IsiFcExGhXLHxJIjuhdWGGp3etLjRhjRPZOGorKbJP_Q8IbLr4X8eXkl0Op3xovCkG-ZXHCvgr6druuoFtkkx_8RLKWzKGMj_VKEpb9O1AyLzEhnNBwcUiiMw0uLLm0gfY7asQpSfNhKKgkROAFep0iYZX1GiLP_hwy9UEBIxtQIgUyPlLHtvAnYe0VMsg"
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