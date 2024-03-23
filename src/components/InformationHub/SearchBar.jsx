import React from 'react';

// In SearchBar.jsx or similar file
function SearchBar({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for any disease"
        onChange={handleInputChange}
        // If you have a state for the input value, make sure it's bound to the value attribute
        // value={inputValue}
        // Make sure to update inputValue state in the parent component upon every change
      />
    </div>
  );
}

export default SearchBar;
