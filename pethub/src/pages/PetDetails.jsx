import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimilarPets from "../components/SimilarPets";
import "./styles/PetDetails.css";
import { fetchToken } from "../api/petFinderToken";
import ContactModal from "../components/ContactModal";
// import CircularProgress from "@mui/joy/CircularProgress";
import CircularProgress from "@mui/material/CircularProgress";

const ComponentDetails = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [similarPets, setSimilarPets] = useState([]);

  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);

  let firstcall = true;

  //   useEffect(() => {
  //     fetch(`https://api.petfinder.com/v2/animals/${id}`)
  //       .then(response => response.json())
  //       .then(data => setComponent(data))
  //       .catch(error => console.error(error));
  //   }, [id]);

  const Fetchpets = async (animal) => {
    const token = await fetchToken();

    const response = await fetch(
      `https://api.petfinder.com/v2/animals/${id}?fields=description&format=full`,
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

    console.log(data);
    console.log(data.animal);
    const fullDescription = data.animal.description.replace(/\.\.\.$/, "");
    data.animal.description = fullDescription;
    setComponent(data.animal);
  };
  const fetchSimilarPets = async () => {
    const token = await fetchToken();
    const breed = encodeURIComponent(component.breeds.primary);
    let similarPetsWithPhotos = [];
    let page = 1;

    while (similarPetsWithPhotos.length < 6) {
      const response = await fetch(
        `https://api.petfinder.com/v2/animals?type=${component.type}&breed=${breed}&size=${component.size}&limit=100&page=${page}`,
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
      console.log(data);

      const filteredData = data.animals.filter(
        (pet) => pet.id !== component.id
      );
      const newPets = filteredData.filter(
        (pet) => !Array.isArray(pet.photos) || pet.photos.length > 0
      );

      similarPetsWithPhotos = [...similarPetsWithPhotos, ...newPets];
      page++;
    }

    setSimilarPets(similarPetsWithPhotos.slice(0, 6));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (firstcall) {
      Fetchpets("dog");
      firstcall = false;
    }
  }, [id]);
  useEffect(() => {
    if (component) {
      fetchSimilarPets();
    }
  }, [component]);

  function handleAdoptClick() {
    if (component.organization && component.organization.website) {
      // Navigate to the organization's website
      window.open(component.organization.website, "_blank");
    } else if (component.contact) {
      // Show the contact modal
      setShowContactModal(true);
    } else {
      // Redirect to sign up page if not authenticated
      // navigate("/signup");
    }
  }

  if (!component) {
    return <CircularProgress size="lg"></CircularProgress>;
  }

  return (
    <div className="main-container">
      <div className="pet-details-container">
        <div variant="outlined" className="component-details">
          <img
            className="pet-details-img"
            src={component.photos[0]?.medium}
            alt={component.name}
          ></img>
          <div className="pet-info-section">
            <div className="pet-details-about-divider"></div>
            <ul className="pet-details-list">
              {component.gender && (
                <li className="pet-details-li">Gender: {component.gender}</li>
              )}
              {component.size && (
                <li className="pet-details-li">Size: {component.size}</li>
              )}
              {component.color && (
                <li className="pet-details-li">Color: {component.color}</li>
              )}
              {component.breeds.primary && (
                <li className="pet-details-li">
                  Breed: {component.breeds.primary}
                </li>
              )}
            </ul>
            <div className="pet-details-about-divider"></div>
            <div className="pet-details-about">
              <h2 className="pet-details-about-heading">
                About {component.name}
              </h2>
              <ul className="pet-details-about-list">
                <li className="pet-details-about-li">
                  Location: {component.contact.address.city},{" "}
                  {component.contact.address.state}
                </li>

                {component.age && (
                  <li className="pet-details-about-li">Age: {component.age}</li>
                )}
                {component.coat && (
                  <li className="pet-details-about-li">
                    Coat Length: {component.coat}
                  </li>
                )}
                {component.attributes && component.attributes.house_trained && (
                  <li className="pet-details-about-li">House-trained: Yes</li>
                )}
                {component.attributes &&
                  !component.attributes.house_trained && (
                    <li className="pet-details-about-li">House-trained: No</li>
                  )}
                {component.attributes && component.attributes.shots_current && (
                  <li className="pet-details-about-li">
                    Shots up to date: Yes
                  </li>
                )}
                {component.attributes &&
                  !component.attributes.shots_current && (
                    <li className="pet-details-about-li">
                      Shots up to date: No
                    </li>
                  )}
                {component.environment && component.environment.children && (
                  <li className="pet-details-about-li">
                    Good with children: Yes
                  </li>
                )}
                {component.environment && !component.environment.children && (
                  <li className="pet-details-about-li">
                    Good with children: No
                  </li>
                )}
                {component.environment && component.environment.dogs && (
                  <li className="pet-details-about-li">
                    Good with other dogs: Yes
                  </li>
                )}
                {component.environment && !component.environment.dogs && (
                  <li className="pet-details-about-li">
                    Good with other dogs: No
                  </li>
                )}
                {component.characteristics && (
                  <li className="pet-details-about-li">
                    Characteristics: {component.characteristics}
                  </li>
                )}
              </ul>
              {component.fee && (
                <p className="pet-details-about-fee">
                  Adoption fee: ${component.fee.amount}
                </p>
              )}
            </div>
            <ContactModal
              show={showContactModal}
              onClose={() => setShowContactModal(false)}
              contact={component.contact}
              petName={component.name}
            />
            <button className="adopt-button" onClick={handleAdoptClick}>
              Details for Adopting {component.name}
            </button>
          </div>
          <div className="similar-pets-section">
            <SimilarPets pets={similarPets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetails;
