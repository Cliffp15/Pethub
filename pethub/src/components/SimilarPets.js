import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchToken } from "../api/petFinderToken";
import PetCard from "./PetImageSelection";

const SimilarPets = () => {
  const [similarPets, setSimilarPets] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSimilarPets = async () => {
      const token = await fetchToken();
      const response = await fetch(
        `https://api.petfinder.com/v2/animals/${id}/similar`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.animals) {
        console.log(data.animals);
        setSimilarPets(data.animals);
      } else {
        setSimilarPets([]);
      }
    };

    fetchSimilarPets();
  }, [id]);

  return (
    <div className="similar-pets">
      <h1>Similar Pets</h1>
      {similarPets.length > 0 ? (
        similarPets.map((pet) => <PetCard key={pet.id} petinfo={pet} />)
      ) : (
        <p>No similar pets found</p>
      )}
    </div>
  );
};

export default SimilarPets;
