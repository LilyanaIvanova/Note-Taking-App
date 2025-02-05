import React from "react";

function SearchBar({ query, onSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search in notes..."
        value={query}
        onChange={onSearch}
      />
    </div>
  );
}

export default SearchBar;
