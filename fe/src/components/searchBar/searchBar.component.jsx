import React from "react";
import './searchBar.styles.css'
export const SearchBar = ({ placeholder }) => {
    return(
        <input
            className="search"
            type="search"
            placeholder={placeholder}
        />
    )
};