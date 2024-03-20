import React from "react";
import { Restaurant } from '../restaurantCard/restaurantCard.component';
import './restaurantList.styles.css'

export const RestaurantList = ({ restaurants, menus }) => (
    <div className="restaurantList">
        {restaurants.map(restaurant => (
            <Restaurant key={restaurant.name} restaurant={restaurant} menus={menus}/>
        ))}
    </div>
);

