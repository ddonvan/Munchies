import React, { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../orderCard/orderCard.component";
import { useCustomerId } from "../../../pages/HomePage/CustomerContext";
import "./orderList.styles.css";

export const OrderList = ({selected}) => {
const [orders, setOrders] = useState([]);
const { customerId } = useCustomerId();

  //Order Fetch
    const fetchOrders = async () => {
        const response = await axios.get(
            `http://localhost:8000/orders/`,
        );
        setOrders(response.data);
    };

    console.log(customerId);

    useEffect(() => {
        fetchOrders();
    }, [])

    const handleDelete = (deletedOrder) => {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== deletedOrder._id));
    };

    // filter orders based on status
    let filteredOrders = [];
    if (selected === "in progress") {
      filteredOrders = customerId
        ? orders.filter(
            (order) =>
              order.customer_id === customerId &&
              (order.status !== "pending" && order.status !== "Completed")
          )
        : orders;
    } else if (selected === "completed") {
      filteredOrders = customerId
        ? orders.filter(
            (order) =>
              order.customer_id === customerId && order.status === "Completed")
        : orders;
    } else {
      filteredOrders = customerId
        ? orders.filter(
            (order) =>
              order.customer_id === customerId && order.status === "pending"
          )
        : orders;
    }
    

    return (
        <div className="orderList">
            {filteredOrders.map(order => (
                <Order key={order._id} order={order} onDelete={handleDelete} fetchOrders={fetchOrders}/>
            ))}
        </div>
    )
}