import React,{ useState } from "react";
import './orderCard.styles.css'
import { useData } from "../../../pages/HomePage/DataContext";
import Button from "react-bootstrap/Button";
import  Modal  from "react-bootstrap/Modal";
import axios from "axios";
import { PickupDropdown } from "./pickupDropdown.component";

export const Order = ({ order, onDelete }) => {
    const {
        _id, customer_id, restaurant_id,
        items, pickup_time, status 
    } = order;

    const { restaurants, menus} = useData();

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
    }
    

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
            window.location.reload();
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

    return (
        <div className="order-container">
            <div className="order-delete">
                {status === "pending" && (
                <Button variant="danger" onClick={() => handleDeleteOrder(order)}>X</Button>
                )}  
            </div>
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
                    const quantity = itemQuantities[item._id] || item.quantity;
                    const itemPrice = menuItem ? menuItem.price * quantity : 0;
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
                                        <p>{menuItem.item_name} x {quantity}</p>
                                        <p className="price">${itemPrice}.00</p>
                                        {status === "pending" && (
                                            <div>
                                                <Button variant="outline-primary" onClick={() => handleDecreaseQuantity(item._id)}>-</Button>{' '}
                                                <Button variant="outline-primary" onClick={() => handleIncreaseQuantity(item._id)}>+</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <div className="bottom-of-card">
                <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
                <div className="pickup-time">
                    <h5>Pickup Time: </h5>
                    <PickupDropdown onSelect={handleSelect} className="dropdown"/>
                </div>
                <h5>Status: {status}</h5>
                {status === "pending" && (
                    <Button className="place-order" variant="primary"
                    onClick={handlePlaceClick}>Place Order</Button>
                )}
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