import React from "react";
// import { useNavigate } from "react-router-dom";
import caticon from "../photos/cat.png";
import dog from "../photos/dog.png";

const Findshelterinfo = ({ shelterinfo, address }) => {

    return (
        <div className="sheltercontents">
            <div className="sheltername"> <strong>{shelterinfo.name}</strong>
            </div> 
            <div className="shelterphone">   Phone: {shelterinfo.phone}
               {/* <h1 className="phonetitle"></h1> */}
            </div> 
                {/* <br /> */}
                <div className="shelterdistance"> Distance: {shelterinfo.distance}
                </div> 
                <div className="shelteraddress"> Address: {address}</div>
                <br />
        </div>
);
};

export default Findshelterinfo;