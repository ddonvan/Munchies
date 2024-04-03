import React from "react";
import './menuCard.styles.css';

export const Menu = ({ menu }) => {
    const { 
        _id, rest_id, item_id, item_name, 
        category, imageURL, price, 
        frequency, status
        } = menu;

    return (
        <div className="menu-container">
            <img
                src={imageURL}
                alt="image placeholder text"
                className="menu-item-image"
            />
            <h5>{item_name}</h5>
            <h5>${price}.00</h5>
        </div>
    )

}