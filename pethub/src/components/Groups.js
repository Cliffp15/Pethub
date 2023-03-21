import React from 'react';
import { useNavigate } from "react-router-dom";
import caticon from "../photos/cat.png"
import dog from "../photos/dog.png"



const GroupCard = ({groupinfo}) => {

    const imgURL =groupinfo.photos
    //const imgURL = caticon;//placeholder
        const navigate = useNavigate();
        const handleCardClick = () => {
          navigate(`/component/${groupinfo.id}`);
        };
        
        return(
                    <div className='grouparea'>
                        <div className="Groupimagesection" onClick={handleCardClick}>
                            <img src={imgURL} alt="No image available" />
                        </div>
                        <div className="Groupinfo">
                            <div className= "groupNamesection">
                                <h1 className="Name">{groupinfo.title}</h1>
                            </div>
                            <div className= "groupdescriptionsection">
                                <h2 className="Description">{groupinfo.description}</h2>
                            </div>
                        </div>
                        <div className= "followbuttonsection">
                            <button className= "follow"> Follow </button>    
                        </div>
                    </div>
        );
}

export default GroupCard;