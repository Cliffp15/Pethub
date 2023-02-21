import React from 'react';
import { useNavigate } from "react-router-dom";
import caticon from "../photos/cat.png"
import dog from "../photos/dog.png"



const PetCard = ({petinfo}) => {
        const imgURL =petinfo.photos[0]?.medium;

        const navigate = useNavigate();

        const handleCardClick = () => {
          navigate(`/component/${petinfo.id}`);
        };
        
        return(
        <div >
            <div className="petimage" onClick={handleCardClick}> 
            <img src={imgURL} alt="No image available" />
            </div>
            {/* <div className="peticon">
              <img src={caticon} alt="caticon" />
              </div> */}
              {/* <div className="favoritebutton">
                <img src={heart} alt="caticon" />
              </div> */}
              <div className="petdetails">
                <h1 className="Name">{petinfo.name}</h1>
                <h1 className='id'>{petinfo.id}</h1>
                <h2 className="Breed&Age">{petinfo.breeds.primary}, {petinfo.age}</h2>
                {/* <h2 className="Age"></h2> */}
                <h2 className="Gender">{petinfo.gender}</h2>
                <h2 className="location">{petinfo.city}, {petinfo.state}</h2>
            </div> 
        </div>
        );
}

export default PetCard;