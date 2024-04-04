import React, { useState } from "react";
import './orderCard.styles.css'
import { useData } from "../../../pages/HomePage/DataContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { PickupDropdown } from "./pickupDropdown.component";
import { CloseButton } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const Order = ({ order, onDelete, fetchOrders }) => {
    const {
        _id, customer_id, restaurant_id,
        items, pickup_time, status
    } = order;

    const { restaurants, menus } = useData();

    const [showModal, setShowModal] = useState(false);
    const [selectedPickupTime, setSelectedPickupTime] = useState('');

    //-------------------------
    const [itemQuantities, setItemQuantities] = useState({});

    const handleIncreaseQuantity = (itemId) => {
        setItemQuantities(prevState => ({
            ...prevState,
            [itemId]: (prevState[itemId] || 1) + 1
        }));
    }

    const handleDecreaseQuantity = (itemId) => {
        setItemQuantities(prevState => ({
            ...prevState,
            [itemId]: Math.max((prevState[itemId] || 1) - 1, 0)
        }));
    }
    //-------------------------

    const handlePlaceClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSelect = (time) => {
        setSelectedPickupTime(time);
    };


    // find restaurant for order
    const restaurant = restaurants.find(restaurant => restaurant._id === restaurant_id);


    const handleDeleteOrder = async (order) => {
        try {
            await axios.delete(`http://localhost:8000/orders/delete/order/${order._id}`);
            console.log("Order deleted")
            onDelete(order);
        } catch (e) {
            console.error("Error deleting order:", e);
        }
    }

    const handlePlaceOrder = async (order) => {
        try {
            const updatedItems = items.map(item => ({
                ...item,
                quantity: itemQuantities[item._id] || item.quantity
            }));

            await axios.patch(`http://localhost:8000/orders/update/${order._id}`, {
                items: updatedItems,
                pickup_time: selectedPickupTime,
                status: "Ordered"
            });
            setShowModal(false);

            fetchOrders();
        } catch (e) {
            console.error("Error placing order:", e);
        }
    }

    // calculate subtotal
    const subtotal = items.reduce((acc, item) => {
        const menuItem = menus.find(menu => menu._id === item.item_id);
        const quantity = itemQuantities[item._id] || item.quantity;
        if (menuItem) {
            acc += menuItem.price * quantity;
        }
        return acc;
    }, 0);

    console.log(selectedPickupTime);

    // Function to calculate progress percentage based on status
    const getStatusProgress = (status) => {
        switch (status) {
            case "Ordered":
                return 25;
            case "In Progress":
                return 50;
            case "Awaiting Pickup":
                return 75;
            case "Completed":
                return 100;
            default:
                return 0;
        }
    }

    return (
        <div className="order-container">
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Karla:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>   
            <div className="order-delete">
                {status === "pending" && (
                    <CloseButton onClick={() => handleDeleteOrder(order)} />
                )}
            </div>
            {restaurant && (
                <div>
                    <h3><strong>{restaurant.name}</strong></h3>
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '15px' }}>
                <p style={{ margin: '0' }}>Order#: {order._id}</p>
                {status !== "pending" && (
                    <ProgressBar
                        animated
                        now={getStatusProgress(status)}
                        label={<span style={{ fontWeight: '800' }}>{getStatusProgress(status)}%</span>}
                        style={{ 
                            marginLeft: 'auto', 
                            width: '300px',  
                            height: '30px', 
                            borderRadius:'20px',
                            border: '1px solid #DADADA',
                            boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)' }} // Pushes the progress bar to the right
                        variant="success"
                    />
                )}
            </div>
            <ul>
                {items.map((item, index) => {
                    // Find the corresponding menu item for each item
                    const menuItem = menus.find(menu => menu._id === item.item_id);
                    const quantity = itemQuantities[item._id] || item.quantity;
                    const itemPrice = menuItem ? menuItem.price * quantity : 0;
                    return (
                        <li key={index}>
                            {menuItem && (
                                <div className="item-container">
                                    <img
                                        src={menuItem.imageURL}
                                        className="item-image"
                                        width="200"
                                    />
                                    <div className="item-info">
                                        <div className="item">
                                            <h4><strong>{menuItem.item_name}</strong></h4>
                                            {status === "pending" && (
                                                <div className="quantity-price-container">
                                                    <div className="quantity">
                                                        <h5>Quantity:</h5>
                                                    </div>
                                                    <div className="quantity-buttons">
                                                        <Button variant="outline-primary" onClick={() => handleDecreaseQuantity(item._id)}>-</Button>
                                                        <span className="quantity-value"><strong>{quantity}</strong></span>
                                                        <Button variant="outline-primary" onClick={() => handleIncreaseQuantity(item._id)}>+</Button>
                                                    </div>
                                                    <div className="price">
                                                        <h5>${itemPrice}.00</h5>
                                                    </div>
                                                </div>
                                            )}
                                            {["Ordered", "In Progress", "Awaiting Pickup", "Completed"].includes(status) && (
                                                <div className="quantity-price-container">
                                                    <div className="quantity">
                                                        <h5>Quantity: {quantity}</h5>
                                                    </div>
                                                    <div className="price">
                                                        <h5>${itemPrice}.00</h5>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <div className="bottom-of-card">
                <hr style={{ width: '100%', height: '1px', backgroundColor: 'black', border: 'none', opacity: 1 }} />

                <div className="price-container">
                    <h5>Subtotal: <strong>${subtotal.toFixed(2)}</strong></h5>
                </div>

                <h5 style={{ paddingBottom: '10px' }}>Status: <strong>{status}</strong></h5>

                <div className="pickup-time">
                    <h5 style={{ marginRight: '8px' }}>Pickup Time: </h5>
                    {status === "pending" ? (
                        <PickupDropdown onSelect={handleSelect} className="dropdown" />
                    ) : (
                        <h5>{pickup_time}</h5>
                    )}
                </div>

                <div className="place-order-container ">
                    {status === "pending" && (
                        <Button className="place-order" variant="outline-primary"
                            onClick={handlePlaceClick}>Place Order</Button>
                    )}
                </div>
            </div>
            <Modal className="modal-order" show={showModal} onHide={handleCloseModal}>
                <Modal.Header>Order Confirmation</Modal.Header>
                <Modal.Body>
                    Are you sure you want to place this order?
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel-button" variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button className="yes-button" variant="primary" onClick={() => handlePlaceOrder(order)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
