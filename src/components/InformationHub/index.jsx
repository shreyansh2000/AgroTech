import React, { useState, useEffect } from 'react';
import DiseaseCard from './DiseaseCard';
import SearchBar from './SearchBar';
import './InformationHub.css';

function InformationHub() {
  const [allDiseases, setAllDiseases] = useState([]); // All diseases
  const [diseases, setDiseases] = useState([]); // Filtered diseases for display
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    fetch('/tomato_diseases.json')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setAllDiseases(sortedData);
        setDiseases(sortedData); // Initially, display all diseases
        setSelectedDisease(sortedData[0]); // Default to the first disease
      })
      .catch((error) => console.error('Error fetching diseases:', error));
  }, []);

  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setDiseases(allDiseases);
      setSelectedDisease(allDiseases[0]);
    } else {
      // Otherwise, filter the diseases
      const filtered = allDiseases.filter((disease) =>
        disease.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setDiseases(filtered);
      setSelectedDisease(filtered.length > 0 ? filtered[0] : null);
    }
  };

  return (
    <div className="information-hub-container">
      <div className="sidebar">
        <SearchBar onSearch={handleSearch} />
        <div className="disease-list">
          {diseases.map((disease) => (
            <div
              key={disease.name}
              className={`disease-item ${selectedDisease === disease ? 'selected' : ''}`}
              onClick={() => setSelectedDisease(disease)}
            >
              {disease.name}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        {selectedDisease && <DiseaseCard disease={selectedDisease} />}
      </div>
    </div>
  );
}

export default InformationHub;
