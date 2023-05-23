import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";

const Share = ({ url, title, image }) => {
  const handleShareUrlUpdate = () => {
    // This function can be used to track the number of shares via the Facebook share button
  };

  const handleEmailShare = () => {
    const emailSubject = `Check out this pet on PetHub: ${title}`;
    const emailBody = `Hi,\n\nI found this pet on PetHub and thought you might be interested. Here's the link:\n\n${url}\n\nThanks!`;
    const emailLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailLink;
  };

  return (
    <div>
      <FacebookShareButton
        style={shareButtonStyle}
        url={window.location.href}
        onClick={handleShareUrlUpdate}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <EmailShareButton
        style={shareButtonStyle}
        url={url}
        subject={title}
        body={url}
      >
        <EmailIcon size={32} round={true} onClick={handleEmailShare} />
      </EmailShareButton>
    </div>
  );
};
const shareButtonStyle = {
  // your desired styles
  backgroundColor: "#007BFF", // change the color to match your theme
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

export default Share;
