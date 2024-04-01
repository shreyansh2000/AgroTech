import React from 'react';

function TreatmentModal({ treatment, onClose }) {
  return (

    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Treatment Information</h2>
        <p>{treatment}</p>
        <p>Additional information...</p>
      </div>
    </div>
  );
}

export default TreatmentModal;
