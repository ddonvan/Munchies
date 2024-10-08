import React, { useRef, useEffect, useState } from "react";
import './header.styles.css';
import { SearchBar } from "../searchBar/searchBar.component";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate hook

export const PageHeader = ({ menuRef, ordersRef, analyticsRef }) => {
    const [scrolled, setScrolled] = useState(false); // State to track whether the user has scrolled
    const navigate = useNavigate(); // Get navigate function from useNavigate hook
    const location = useLocation(); // Get current location

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100; // Check if user has scrolled
            setScrolled(isScrolled); // Update state
        };

        window.addEventListener('scroll', handleScroll); // Add scroll event listener

        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
        };
    }, []);

    const handleCartButtonClick = () => {
        // Navigate to the cart page when the button is clicked
        navigate('/cart');
    };

    const handleHomeButtonClick = () => {
        // Navigate to the home page when the button is clicked
        navigate('/');
    };

    const handleManagerClick = () => {
        navigate('/manager');
    }

    const handleOrdersClick = () => {
        // Scroll to the Orders section when clicked
        if (ordersRef.current) {
            ordersRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMenuClick = () => {
        // Scroll to the Orders section when clicked
        if (menuRef.current) {
            menuRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAnalyticsClick = () => {
        // Scroll to the Orders section when clicked
        if (analyticsRef.current) {
            analyticsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar${scrolled && location.pathname !== '/cart' ? ' scrolled' : ''}${location.pathname === '/cart' ? ' cart-page' : ''}`}>
            <div className="home-btn" onClick={handleHomeButtonClick}>CUSTOMER</div>
            <div className="manager-select-container" onClick={handleManagerClick}>MANAGER</div>
            <div className="search-bar-container">
                <SearchBar placeholder='Search'/>
            </div>

            {(location.pathname === "/manager") && (
                <div className="theAnchors">
                    <div className="menu-btn" onClick={handleMenuClick}>MENU</div>
                    <div className="orders-btn" onClick={handleOrdersClick}>ORDERS</div>
                    <div className="analytics-btn" onClick={handleAnalyticsClick}>ANALYTICS</div>
                </div>
            )}

            {/* Conditionally render the cart button only if the route is "/" */}
            {(location.pathname === "/" || location.pathname === "/cart") && (
               <button onClick={handleCartButtonClick} style={{ width: '120px', borderRadius:'5px' }}>
                <strong>Orders</strong>
               <img 
                src={require('./orders-icon.png')} 
                style={{ width: '25px', height: 'auto', marginLeft: '10px', zIndex:1 }}/>
             </button>
            )}
        </nav>
    );
}
