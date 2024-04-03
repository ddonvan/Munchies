import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import "./managerMenuCard.styles.css";

export const ManagerMenu = ({ menu, fetchMenus}) => {
    const [showModal, setShowModal] = useState(false);
    const [itemStatus, setItemStatus] = useState(menu.status); // Initialize itemStatus with the initial status from props

    const { 
        _id, rest_id, item_id, item_name, 
        category, imageURL, price, 
        frequency, status
    } = menu;

    const handleDeleteItem = async () => {
        try {
            await axios.delete(`http://localhost:8000/menus/${_id}`);
            console.log("Item deleted");
            fetchMenus();
        } catch (e) {
            console.error("Error deleting item:", e);
        }
    };
    

    const handleEditClick = () => {
        setShowModal(true); // Open Modal
    };

    const handleSaveClick = async () => {
        try {            
            await axios.patch(`http://localhost:8000/menus/${_id}`, { "status": itemStatus });
            console.log("Item updated");
        } catch (e) {
            console.error("Error updating item:", e);
        }

        setShowModal(false);
    }

    const handleCloseModal = () => {
        setItemStatus(status);
        setShowModal(false); // Close Modal
    };

    const toggleStatus = () => {
        setItemStatus(prevStatus => prevStatus === "available" ? "sold out" : "available");
    };

    return (
        <div className="managermenu-container">
            <div className="item-delete">
                <Button variant="danger" onClick={() => handleDeleteItem(menu)}>X</Button>
            </div>
            <img src={imageURL} alt="image placeholder text" className="menu-item-image" />
            <h5>{item_name}</h5>
            <h5>${price}.00</h5>
            <div className="edit-button">
                <Button variant="primary" onClick={handleEditClick}>Edit</Button>
            </div>

            {/* Modal for Menu Items */}
            <Modal show={showModal} onHide={handleCloseModal} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>{item_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={imageURL} alt="image placeholder text" className="menu-item-image" />
                    <h5>Price: ${price}.00</h5>
                    <h5>Status: {itemStatus}</h5> {/* Use itemStatus here */}
                    <button onClick={toggleStatus}>
                        {itemStatus === "available" ? "Mark Sold Out" : "Mark Available"}
                    </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSaveClick}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagerMenu;
