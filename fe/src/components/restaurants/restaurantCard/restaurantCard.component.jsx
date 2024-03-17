import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import './restaurantCard.styles.css'
export const Restaurant = ({ restaurant }) => {
    const { name, address, imageURL } = restaurant; //components of restaurant model

    return (
        <div className="restaurant-container">
            <img
                src={imageURL}
                alt="image placeholder text"
                className="restaurant-image"
            />
            <h3>{name}</h3>
            <h5>{address}</h5>
            <Button className="order-button" variant="outline-primary">Order</Button>
        </div>
    )
}

