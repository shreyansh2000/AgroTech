// TreatmentModal.jsx or similar file

import React from 'react';
import { NavLink } from 'react-router-dom';

const TreatmentModal = ({ treatment, onClose }) => {
  // If treatment is now an object with both the info and the disease name
  const { treatmentInfo, diseaseName } = treatment;

  // Create the link based on the diseaseName
  const linkToDiseaseInfo = `/informationhub?search=${encodeURIComponent(diseaseName)}`;

  return (
    <div className="treatment-modal">
      {/* ... your modal content ... */}
      <p>{treatmentInfo}</p>
      <NavLink to={linkToDiseaseInfo}>
        Learn more about {diseaseName}
      </NavLink>
      {/* ... more of your modal content ... */}
    </div>
  );
};

export default TreatmentModal;
