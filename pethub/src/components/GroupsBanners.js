import React from 'react';
import { useNavigate } from "react-router-dom";




const GroupBannerCard = ({groupbannerinfo}) => {

    const imgURL =groupbannerinfo.photos
   //   const imgURL = caticon; //placeholder
        const navigate = useNavigate();
        const handleCardClick = () => {
          navigate(`/component/${groupbannerinfo.id}`);
        };
        
        return(
            <div className='bannergrouparea'>
                <div className="bannerGroupimagesection" onClick={handleCardClick}>
                    <img src={imgURL} alt="No image available" />
                </div>
                <div className="bannerGroupinfo">
                    <div className= "bannergroupNamesection">
                        <h1 className="bannerName">{groupbannerinfo.title}</h1>
                    </div>
                </div>
            </div>
        );
}

export default GroupBannerCard;