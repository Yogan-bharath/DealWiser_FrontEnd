import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {

  const [query, setQuery] = useState("");

useEffect(() => {

  const timer = setTimeout(() => {

    if (onSearch) {
      onSearch(query);
    }

  }, 400);

  return () => clearTimeout(timer);

}, [query]);


  return (

    <form className="search-bar">

      <div className="search-input-wrapper">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search products like iPhone 15, MacBook, AirPods..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>

      <button type="submit">Search</button>

    </form>

  );
};

export default SearchBar;