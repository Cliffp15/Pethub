import React from "react";
import Typography from "./Typography";

const SimilarPets = ({ pets }) => {
  return (
    <div className="similar-pets-container">
      <h2 className="similar-pets-title">Similar Pets</h2>
      <div className="similar-pets-grid">
        {pets.map((pet) => (
          <a key={pet.id} href={`/component/${pet.id}`} className="similar-pet">
            <img
              src={pet.photos[0]?.medium}
              alt={pet.name}
              className="similar-pet-img"
            />

            <h3 className="similar-pet-name">{pet.name}</h3>
            <p className="similar-pet-breed">{pet.breeds.primary}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SimilarPets;
