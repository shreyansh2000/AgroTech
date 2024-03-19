import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      id="search-bar"
      placeholder="Search for any disease..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
