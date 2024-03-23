import React from "react";
import { Order } from "../orderCard/orderCard.component";

export const OrderList = ({ orders }) => {
    
    return (
        <div className="orderList">
            {orders.map(order => (
                <Order key={order._id} order={order}/>
            ))}
        </div>
    )
}