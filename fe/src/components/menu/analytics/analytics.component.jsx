import React, { useState } from "react";
import './analytics.styles.css';

export const Analytics = ({ orders, menus, currentMenu }) => {
    // Calculate the total number of orders
    const totalOrders = orders.length;

    const uniqueCustomers = new Set();

    // Iterate through orders to count unique customers
    orders.forEach(order => {
        uniqueCustomers.add(order.customer_id);
    });

    const totalCustomers = uniqueCustomers.size;

    const totalRevenue = orders.reduce((acc, order) => {
        // Calculate subtotal for each order
        const subtotal = order.items.reduce((subTotalAcc, item) => {
            const menuItem = menus.find(menu => menu._id === item.item_id);
            if (menuItem) {
                subTotalAcc += menuItem.price * item.quantity;
            }
            return subTotalAcc;
        }, 0);
        return acc + subtotal;
    }, 0);

    const itemFrequency = currentMenu.map(item => {
        const count = orders.reduce((acc, order) => {
            return acc + order.items.filter(orderItem => orderItem.item_id === item._id).length;
        }, 0);
        return { item, count };
    });

    const allPickupTimes = ["14:00","17:00","17:30", "18:00","18:30", 
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

    // Calculate orders per pickup time
    const pickupTimeFrequency = allPickupTimes.reduce((acc, pickupTime) => {
        acc[pickupTime] = 0; // Initialize count to 0 for each pickup time
        return acc;
    }, {});

    // Increment count for each order's pickup time
    orders.forEach(order => {
        const { pickup_time } = order;
        pickupTimeFrequency[pickup_time] += 1;
    });

    return (
        <div>
            <div className="analyticstitle">Analytics</div>
        <div className="analyticspage">
            
            <div className="orderFreq"> 
            <div className="orderFreqTitle">Total number of orders: </div>
            {totalOrders}
            </div>
            <p>Total number of unique customers: {totalCustomers}</p>
            <p>Total revenue: ${totalRevenue.toFixed(2)}</p>
            <ul>
                {itemFrequency.map(({ item, count }) => (
                    <li key={item._id}>
                        {item.item_name}: {count}
                    </li>
                ))}
            </ul>
            <h4>Pickup Time Frequency:</h4>
            <ul>
                {Object.entries(pickupTimeFrequency).map(([pickupTime, count]) => (
                    <li key={pickupTime}>
                        Pickup Time: {pickupTime} - Orders: {count}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

