import React from "react";
import './header.styles.css';
import { SearchBar } from "../searchBar/searchBar.component";

export const PageHeader = ({}) => {
    return (
        <nav className="navbar">
            <h1>Order App</h1>
            <div className="search-bar-container">
                <SearchBar placeholder='Search'/>
            </div>
            <button>Cart</button>
        </nav>
    )
}