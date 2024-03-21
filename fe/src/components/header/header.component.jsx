import React from "react";
import './header.styles.css';
import { SearchBar } from "../searchBar/searchBar.component";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export const PageHeader = () => {
    const navigate = useNavigate(); // Get navigate function from useNavigate hook

    const handleCartButtonClick = () => {
        // Navigate to the cart page when the button is clicked
        navigate('/cart');
    };
    const handleHomeButtonClick = () => {
        // Navigate to the cart page when the button is clicked
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="home-btn" onClick={handleHomeButtonClick}>Our App</div>
            <div className="search-bar-container">
                <SearchBar placeholder='Search'/>
            </div>
            {/* Attach onClick event handler to the Cart button */}
            <button onClick={handleCartButtonClick}>Cart</button>
        </nav>
    );
};
