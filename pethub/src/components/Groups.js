import React from 'react';
import { useNavigate } from "react-router-dom";
import caticon from "../photos/cat.png"
import dog from "../photos/dog.png"



const GroupCard = ({groupinfo}) => {

    const groupsampledata = [
    {
    title: "Cute Kitten Club", 
    description: "A place where all cute kittens from acorss the world!",
    photos: `${dog}`,
    },
    {
        title: "Canine Crew", 
        description: "Collections of cool canines!",
        photos: `${dog}`,
    },
    { 
        title: "Furry Felines", 
        description: "The furriest felines you can find!",
        photos: `${dog}`, 
    },
    { 
        title: "Golden Guppies", 
        description: "Glorious golden guppies!",
        photos: `${dog}`,
    }
]


    //  const imgURL =groupinfo.photos[0]?.medium;
    const imgURL = caticon;
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
                        <h1 className="Name">Cute Kitten Club</h1>
                    </div>
                    <div className= "groupdescriptionsection">
                        <h2 className="Description">A place where all cute kittens from across the world!</h2>
                    </div>
                </div>
                <div className= "followbuttonsection">
                    <button className= "follow"> Follow </button>    
                </div>
            </div>
        
        
        // <div className='grouparea'>
        //     <div className="Groupimage" onClick={handleCardClick}>
        //         <img src={imgURL} alt="No image available" />
        //     </div>
        //     <div className= "groupName">
        //         <h1 className="Title">{groupinfo.name}</h1>
        //     </div>
        //     <div className= "groupname">
        //         <h2 className="Description">{groupinfo.description}</h2>
        //     </div>
        // </div>
        );
}

export default GroupCard;