import React from "react";
import { RWebShare } from "react-web-share";

const WebShare = ({ url, title, text }) => {
  const shareData = { title, text, url };

  return (
    <RWebShare
      data={shareData}
      onClick={() => console.log("shared successfully!")}
    >
      <button style={shareButtonStyle}>Share this pet</button>
    </RWebShare>
  );
};

export default WebShare;

const shareButtonStyle = {
  // your desired styles
  backgroundColor: "#000",
  opacity: "0.5", // change the color to match your theme
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  transitionDuration: "0.4s",
};
