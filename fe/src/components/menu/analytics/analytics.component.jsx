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
            const itemInOrder = order.items.find(orderItem => orderItem.item_id === item._id);
            if (itemInOrder) {
                acc += itemInOrder.quantity; // Add quantity of this item in the order
            }
            return acc;
        }, 0);
        return { item, count };
    });
    
    const allPickupTimes = ['ASAP', '9:00', '9:30', '10:00',
    '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00',
    '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00',
    '20:30', '21:00', '21:30', '22:00' ];

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
        y: itemFrequency.map(item => item.item.item_name),
        orientation: 'h'
    }];

    const layout = {
        margin: {
            l: 140, // Adjust the left margin as needed
            r: 50,
            b: 50,
            t: 10,
            pad: 4
        },
        width: 480,
        height: 250,
        xaxis: {
            title: {
                text: '# of Orders',
                font: {
                    family: "Karla",
                    size: 16, // Adjust the font size as needed
                    color: 'black' // Adjust the font color as needed
                }
            },
            tickfont: {
                family: "Karla",
                size: 12, // Adjust the font size as needed
                color: 'black' // Adjust the font color as needed
            }
            
        },
        yaxis: {
            
                font: {
                    family: "Karla",
                    size: 16, // Adjust the font size as needed
                    color: 'black' // Adjust the font color as needed
                
            },
            tickfont: {
                family: "Karla",
                size: 12, // Adjust the font size as needed
                color: 'black' // Adjust the font color as needed
            }
        },
        
    };

    const timeData = [{
        type: 'scatter',
        x: allPickupTimes,
        y: Object.values(pickupTimeFrequency), // Extracting counts from the object
        mode: 'lines+markers',
        name: 'Order Counts'
    }];

    const timeLayout = {
        margin: {
            r: 50,
            b: 80,
            t: 10,
            pad: 4
        },
        xaxis: {
            title: {
                text: 'Pickup Time',
                font: {
                    family: "Karla",
                    size: 16, // Adjust the font size as needed
                    color: 'black' // Adjust the font color as needed
                }
            },
            tickfont: {
                family: "Karla",
                size: 12, // Adjust the font size as needed
                color: 'black' // Adjust the font color as needed
            }
        },
        yaxis: {
            title: {
                text: '# of Orders',
                font: {
                    family: "Karla",
                    size: 16, // Adjust the font size as needed
                    color: 'black' // Adjust the font color as needed
                }
            },
            tickfont: {
                family: "Karla",
                size: 12, // Adjust the font size as needed
                color: 'black' // Adjust the font color as needed
            }
        },
        width: 650,
        height: 250
    };


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

                    <div className="plot-container">
                        <Plot
                            data={data}
                            layout={layout}
                        />
                    </div>

                </div>

                
            </div>

            <div className="row2">
                <div className="timeFreq">
                        <div className="timeFreqTitle">Pickup Time Frequency:</div>
                        <div className="lineGraph">
                        <Plot
    data={timeData} // Corrected prop name
    layout={timeLayout} // Corrected prop name
/>
                </div>
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

