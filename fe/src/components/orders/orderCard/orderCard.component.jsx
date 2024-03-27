import React from "react";
import './orderCard.styles.css'
import { useData } from "../../../pages/HomePage/DataContext";

export const Order = ({ order }) => {
    const {
        _id, customer_id, restaurant_id,
        items, pickup_time, status 
    } = order;

    const { restaurants, menus } = useData();

    // find restaurant for order
    const restaurant = restaurants.find(restaurant => restaurant._id === restaurant_id);

    console.log("Items: ", items )
    console.log("Menu: ", menus)
    // calculate subtotal
    const subtotal = items.reduce((acc, item) => {
        const menuItem = menus.find(menu => menu._id === item.item_id);
        if (menuItem) {
            acc += menuItem.price * item.quantity;
        }
        return acc;
    }, 0);


    return (
        <div className="order-container">
            <p>Order#: {order._id}</p>
            {restaurant && (
                <div>
                    <h5>{restaurant.name}</h5>
                </div>
            )}
            <ul>
            {items.map((item, index) => {
                    // Find the corresponding menu item for each item
                    const menuItem = menus.find(menu => menu._id === item.item_id);
                    return (
                        <li key={index}>
                            {menuItem && (
                                <div className="item-container">
                                    <img 
                                        src={menuItem.imageURL}
                                        className="item-image"
                                        width="140"
                                    />
                                    <div className="item-info">
                                        <p>{menuItem.item_name} x{item.quantity}</p>
                                        <p className="price">${menuItem.price}.00</p>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
            <h5>Pickup Time: {pickup_time}</h5>
            <h5>Status: {status}</h5>
        </div>
    )
}