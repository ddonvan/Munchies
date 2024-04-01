import React, { useState } from "react";
import { Menu } from "../menuCard/menuCard.component";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';
import './menuList.styles.css';
import { useCart } from '../../../pages/CartPage/CartContext'; 
import axios from "axios";

export const MenuList = ({ menus }) => {
    const { addToCart, removeFromCart } = useCart(); // Access addToCart and removeFromCart functions from the context
    const [localCart, setLocalCart] = useState({}); // Local state for handling UI updates

    const handleAddToCart = (itemId) => {
        setLocalCart(prevLocalCart => ({
            ...prevLocalCart,
            [itemId]: (prevLocalCart[itemId] || 0) + 1
        }));
        addToCart(itemId); // Call addToCart function
    };

    const handleRemoveFromCart = (itemId) => {
        if (localCart[itemId] > 0) {
            setLocalCart(prevLocalCart => ({
                ...prevLocalCart,
                [itemId]: prevLocalCart[itemId] - 1
            }));
            removeFromCart(itemId); // Call removeFromCart function
        }
    };

    //---------------------------------------------
    const [showToast, setShowToast] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleCreateOrder = async (menu) => {
        // Check for existing order
        if(orderId) {
            try {
                await axios.patch(`http://localhost:8000/orders/add/${orderId}`, {
                    item_id: menu._id,
                    quantity: 1
                });
                console.log("Item added to order");
            } catch (e) {
                console.error("Error adding item to order:", e);
            }
        } else {
            // If order doesn't exist, create new order
            try {
                const response = await axios.post("http://localhost:8000/orders/", {
                    customer_id: "65fcd1c840fad7ac193174c5", //hard coded for default customer for now
                    restaurant_id: menu.rest_id,
                    items: [{ item_id: menu._id, quantity: 1}],
                    pickup_time: "pending", //subject to change
                    status: "pending"
                });
                setOrderId(response.data._id);
                console.log("Order created:", response.data);
            } catch (e) {
                console.error("Error creating order:", e);
            }
        }
    }

    return (
        <div className={`menuList ${showToast ? 'toast-visible' : ''}`}>
            <ToastContainer
                className="p-3 bg-opacity-50"
                bg='success'
                position={'top-center'}
                style={{ zIndex: 1000 }} // ensure toast is above the background
            >
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide>
                <Toast.Header id="custom-toast" style={{ backgroundColor: 'rgba(220, 137, 74, 0.9)', color: 'white' }}>
                    <strong className="order-info" style={{paddingRight:'170px'}}>Order Notification</strong>
                </Toast.Header>
                <Toast.Body id="toast-body" style={{ backgroundColor: 'rgba(220, 137, 74, 0.5)', color: 'black'}}>
                    Item added to order!
                </Toast.Body>
                </Toast>
            </ToastContainer>


            {menus.map(menu => (
                <div key={menu.item_name} className="menu-item">
                    <Menu key={menu.item_name} menu={menu}/>  
                    <div className="menu-item-actions">
                        <Button onClick={() => {
                            handleCreateOrder(menu); 
                            setShowToast(true);
                        }}>Add to Cart</Button>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}
