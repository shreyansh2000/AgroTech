import React, { useState, useEffect } from 'react';
import DiseaseCard from './DiseaseCard';
import SearchBar from './SearchBar';
import './InformationHub.css';
import { animated, useSpring } from 'react-spring';

function InformationHub() {
  const [allDiseases, setAllDiseases] = useState([]); // All diseases
  const [diseases, setDiseases] = useState([]); // Filtered diseases for display
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchMessage, setSearchMessage] = useState(""); // Message to display for search result

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

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
      // If the search text is empty, reset to the full list of diseases
      setDiseases(allDiseases);
      setSelectedDisease(allDiseases[0]);
      setSearchMessage(""); // Clear search message
    } else {
      // Otherwise, filter the diseases
      const filtered = allDiseases.filter((disease) =>
        disease.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setDiseases(filtered);
      setSelectedDisease(filtered.length > 0 ? filtered[0] : null);
      setSearchMessage(filtered.length > 0 ? "" : "Please Select Proper Input");
    }
  };

  return (
    <>
    <animated.div className="information-hub-container" style={{ ...fadeIn }}>
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
        {selectedDisease ? (
          <DiseaseCard disease={selectedDisease} />
        ) : (
          <div className="text-3xl text-red-600">{searchMessage}</div>
        )}
      </div>
 
    </animated.div>


    </>
  );
}

export default InformationHub;
