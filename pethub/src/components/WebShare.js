import React from "react";
import { RWebShare } from "react-web-share";

const WebShare = ({ url, title, text }) => {
  const shareData = { title, text, url };

  return (
    <RWebShare data={shareData} onClick={() => console.log("shared successfully!")}>
      <button>Share this pet</button>
    </RWebShare>
  );
};

export default WebShare;
