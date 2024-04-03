import React, {useRef} from "react";
import './header.styles.css';
import { SearchBar } from "../searchBar/searchBar.component";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate hook

export const PageHeader = ({ menuRef,ordersRef, analyticsRef}) => {
    const navigate = useNavigate(); // Get navigate function from useNavigate hook
    const location = useLocation(); // Get current location

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
        <nav className="navbar">
            <div className="home-btn" onClick={handleHomeButtonClick}>Customer</div>
            <div className="manager-select-container" onClick={handleManagerClick}>Manager</div>
            <div className="search-bar-container">
                <SearchBar placeholder='Search'/>
            </div>

            {(location.pathname === "/manager") && (
                <div className="theAnchors">
                    <div className="menu-btn" onClick={handleMenuClick}>Menu</div>
                    <div className="orders-btn" onClick={handleOrdersClick}>Orders</div>
                    <div className="analytics-btn" onClick={handleAnalyticsClick}>Analytics</div>
                </div>
               

            )}

            {/* Conditionally render the cart button only if the route is "/" */}
            {(location.pathname === "/" || location.pathname === "/cart") && (
               <button onClick={handleCartButtonClick} style={{ width: '100px', borderRadius:'5px' }}>
                Cart
               <img 
                src={require('./shopping-cart.png')} 
                style={{ width: '30px', height: 'auto', marginLeft: '10px', zIndex:1 }}/>
             </button>
            )}
        </nav>
    );
}

