import React from "react";
import { useNavigate } from "react-router-dom";
import caticon from "../photos/cat.png";
import dog from "../photos/dog.png";

const PetCard = ({ petinfo }) => {
  const imgURL = petinfo.photos[0]?.medium || "/path/to/placeholder-image.jpg";

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/component/${petinfo.id}`);
  };

  return (
    <div className="pet-card">
        {/* <img className="pet-card_image-backdrop" src={imgURL} alt="No image available" /> */}
      <div className="pet-card__image" onClick={handleCardClick}>
        {/* <picture src={imgURL}></picture> */}
        <h3 className="See-Pet-Profile">See Profile</h3>
        <img src={imgURL} alt="No image available" />
      </div>
      <div className="pet-card__details">
        <h1 className="pet-card__name">{petinfo.name}</h1>
        <h2 className="pet-card__breed">
          {petinfo.breeds.primary}, {petinfo.age}
        </h2>
        <h2 className="pet-card__gender">{petinfo.gender}</h2>
        <h2 className="pet-card__location">
          {petinfo.contact.address.city}, {petinfo.contact.address.state}
        </h2>
      </div>
    </div>
  );
};

export default PetCard;
