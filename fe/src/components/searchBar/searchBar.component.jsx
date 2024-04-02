import React from "react";
import './searchBar.styles.css'
export const SearchBar = ({ placeholder, handleInput }) => {
    return(
        <input
            className="search"
            type="search"
            placeholder={placeholder}
            onChange={handleInput}
        />
    )
};