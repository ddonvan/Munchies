import React, { useEffect, useState } from "react";
import axios from "axios";
import { ManagerOrder } from "../managerOrderCard.js/managerOrderCard";
import "./managerOrderList.styles.css"

export const ManagerOrderList = ({ orders }) => {

    return (
        <div className="managerorderList">
            {orders.map(order => (
                <ManagerOrder key={order._id} order={order}/>
            ))}
        </div>
    )
}