import React from 'react';

function DiseaseCard({ disease, isExpanded, onReadMoreClick }) {
  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`}>
      <h2>{disease.name}</h2>
      <div className="card-content">
        <p><strong>Information:</strong> {disease.information}</p>
        <p><strong>Prevention & Treatment:</strong> {disease.prevention_and_treatment}</p>
        <button className="read-more" onClick={onReadMoreClick}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
}

export default DiseaseCard;
