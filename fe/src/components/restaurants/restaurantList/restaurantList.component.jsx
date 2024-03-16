import React from "react";
import { Restaurant } from '../restaurantCard/restaurantCard.component';
import './restaurantList.styles.css'

export const RestaurantList = ({ restaurants }) => (
    <div className="restaurantList">
        {restaurants.map(restaurant => (
            <Restaurant key={restaurant.name} restaurant={restaurant}/>
        ))}
    </div>
);

