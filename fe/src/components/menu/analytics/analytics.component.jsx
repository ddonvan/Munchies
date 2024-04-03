import React, { useState } from "react";
import './analytics.styles.css';
import Plot from "react-plotly.js";

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

    const data = [{
        type: 'bar',
        x: itemFrequency.map(item => item.count),
        y: itemFrequency.map(item => item.itemName),
        orientation: 'h'
    }];
    
    return (
        <div>
            <div className="analyticstitle">Analytics</div>
            
        <div className="analyticspage">
            <div className="row1">
                <div className="orderFreq"> 
                    <div className="orderFreqTitle">Total number of orders: </div>
                    <div className="orderFreqVal">{totalOrders}</div>
                </div>

                <div className="custFreq"> 
                    <div className="custFreqTitle">Total # of unique customers: </div>
                    <div className="custFreqVal">{totalCustomers}</div>
                </div>

                <div className="itemFreq">
                    <div className="itemFreqTitle">Frequency of Items Ordered: </div>

                    <ul>
                        {itemFrequency.map(({ item, count }) => (
                            <li key={item._id}>
                                {item.item_name}: {count}
                            </li>
                        ))}
                    </ul>

                </div>

                
            </div>

            <div className="row2">
                <div className="timeFreq">
                        <div className="timeFreqTitle">Pickup Time Frequency:</div>
                        {/* <ul>
                        {Object.entries(pickupTimeFrequency).map(([pickupTime, count]) => (
                            <li key={pickupTime}>
                                Pickup Time: {pickupTime} - Orders: {count}
                            </li>
                        ))}
                        </ul> */}
                </div>
                <div className="revenue">

                    <div className="revenueTitle">
                        Total revenue: 
                    </div>
                    <div className="revenueValue">
                        ${totalRevenue.toFixed(2)}  
                    </div>
                </div>
                

            </div>
            
            

          
            


            
            
            </div>
        </div>
    );
}

