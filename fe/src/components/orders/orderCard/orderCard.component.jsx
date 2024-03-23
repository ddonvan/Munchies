import React from "react";
import './orderCard.styles.css'

export const Order = ({ order }) => {
    const {
        _id, customer_id, restaurant_id,
        items, subtotal, pickup_time, status 
    } = order;

    return (
        <div className="order-container">
            <p>{order._id}</p>
            <h5>Customer ID:{order.customer_id}</h5>
            <h5>Restaurant ID:{order.restaurant_id}</h5>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        Item ID: {item.item_id}, Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <h5>Subtotal: {subtotal}</h5>
            <h5>Pickup Time: {pickup_time}</h5>
            <h5>Status: {status}</h5>
        </div>
    )
}