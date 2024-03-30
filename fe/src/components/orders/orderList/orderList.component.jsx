import React, { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../orderCard/orderCard.component";
import "./orderList.styles.css";

export const OrderList = () => {
const [orders, setOrders] = useState([]);

  //Order Fetch
    useEffect(() => {
        const fetchOrders = async () => {
        const response = await axios.get(
            'http://localhost:8000/orders',
        );
        setOrders(response.data);
        };
        fetchOrders();
    }, []);

    const handleDelete = (deletedOrder) => {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== deletedOrder._id));
    };

    return (
        <div className="orderList">
            {orders.map(order => (
                <Order key={order._id} order={order} onDelete={handleDelete}/>
            ))}
        </div>
    )
}