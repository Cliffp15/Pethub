import React from "react";
import "../pages/styles/ContactModal.css";

const ContactModal = ({ show, onClose, contact, petName }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="contact-modal-wrapper">
      <div className="contact-modal-content">
        <h2 className="contact-modal-title">Contact Information</h2>
        <p className="contact-modal-instructions">
          To adopt {petName}, please contact the organization:
        </p>
        <ul className="contact-modal-details">
          <li className="contact-modal-detail">Email: {contact.email}</li>
          <li className="contact-modal-detail">Phone: {contact.phone}</li>
        </ul>
        <button className="contact-modal-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
