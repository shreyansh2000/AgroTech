import React from 'react';

function DiseaseCard({ disease, isExpanded, onReadMoreClick }) {
  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`}>
      <h2>{disease.name}</h2>
      <br />
      <div className="card-content">
        <p><strong>Information:</strong> {disease.information}</p>
        <br />
        <p><strong>Prevention & Treatment:</strong> {disease.prevention_and_treatment}</p>
        
      </div>
    </div>
  );
}

export default DiseaseCard;
