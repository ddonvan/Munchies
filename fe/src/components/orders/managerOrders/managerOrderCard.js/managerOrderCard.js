import React, { useState } from "react";
import { useData } from "../../../../pages/HomePage/DataContext";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import "./managerOrderCard.styles.css";

export const ManagerOrder = ({ order, fetchOrders }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemStatus, setItemStatus] = useState(order.status);
    const {
        _id, customer_id, restaurant_id,
        items, pickup_time, status 
    } = order;

    const { restaurants, menus } = useData();

    // find restaurant for order
    const restaurant = restaurants.find(restaurant => restaurant._id === restaurant_id);
    // calculate subtotal
    const subtotal = items.reduce((acc, item) => {
        const menuItem = menus.find(menu => menu._id === item.item_id);
        if (menuItem) {
            acc += menuItem.price * item.quantity;
        }
        return acc;
    }, 0);

    const handleEditClick = () => {
        setShowModal(true); // Open Modal
    };

    const handleSaveClick = async () => {
        try {            
            await axios.patch(`http://localhost:8000/orders/update/${_id}`, { "status": itemStatus });
            console.log("Item updated");
        } catch (e) {
            console.error("Error updating item:", e);
        }
        fetchOrders();
        setShowModal(false);
    }

    const handleCloseModal = () => {
        setItemStatus(status);
        setShowModal(false); // Close Modal
    };

    const toggleStatus = () => {
        switch (itemStatus) {
            case "pending":
                setItemStatus("in-progress");
                break;
            case "in-progress":
                setItemStatus("awaiting-pickup");
                break;
            case "awaiting-pickup":
                setItemStatus("completed");
                break;
            case "completed":
                // Do nothing if already completed
                break;
            default:
                setItemStatus("pending");
                break;
        }
    };
    
    


    return (
        <div className="manager-order-container">
            {/* <div className="order-delete">
                <Button variant="danger" onClick={() => handleDeleteOrder(order)}>X</Button>
            </div> */}
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
            <div className="edit-button">
                <Button variant="primary" onClick={handleEditClick}>Edit</Button>
            </div>

            {/* Modal for Menu Items */}
            <Modal show={showModal} onHide={handleCloseModal} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Order#: {_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Status: {itemStatus}</h5>
                    <button onClick={toggleStatus}>
                        {itemStatus === "pending" ? "Start Processing" :
                        itemStatus === "in-progress" ? "Ready for Pickup" :
                        itemStatus === "awaiting-pickup" ? "Complete Pickup" :
                        itemStatus === "completed" ? "Order Completed" : ""}
                    </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSaveClick}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}