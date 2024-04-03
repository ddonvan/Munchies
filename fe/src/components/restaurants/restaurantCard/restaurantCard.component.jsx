import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './restaurantCard.styles.css'
import { MenuList } from "../../menu/menuList/menuList.component";
import { SearchBar } from "../../searchBar/searchBar.component";

export const Restaurant = ({ restaurant, menus }) => {
    const { _id, name, address, imageURL } = restaurant; //components of restaurant model

    const [ showModal, setShowModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [restMenus, setRestMenus] = useState([]);

    useEffect(() => {
        setRestMenus(menus.filter(menu => menu.rest_id === _id && menu.status === "available"));
    }, [_id, menus]);
    

    const handleOrderClick = () => {
        setShowModal(true); // Open Modal
        console.log(restaurant._id);
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close Modal
    }

    useEffect(() => {
        let filtered = [];
        if (searchInput === "") {
            filtered = restMenus
        } else {
            filtered = restMenus.filter(menu => 
              menu.item_name.toLowerCase().includes(searchInput.toLowerCase())  
            );
        }
        setFilteredMenus(filtered);
    }, [restMenus, searchInput]);

    const handleInput = e => {
        setSearchInput(e.target.value)
      };
    
    
    console.log("filtered:",filteredMenus);

    return (
        <div className="restaurant-container">
                      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Karla:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>   
            <img
                src={imageURL}
                alt="image placeholder text"
                className="restaurant-image"
            />
            <h3>{name}</h3>
            <h5>{address}</h5>
            <Button className="order-button" variant="outline-primary"
             onClick={handleOrderClick}>Order</Button>

            {/* Modal for Menu Items */}
            <Modal show={showModal} onHide={handleCloseModal} className="modal" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>{name} Items</Modal.Title>
                    <div id="menuSearch" className="searchbarContainer">
                        <SearchBar placeholder='Search' id="menu-search" handleInput={handleInput}/>
                    </div>
                    
                </Modal.Header>
                <Modal.Body>
                    <div className="menu-items">
                    <MenuList menus={filteredMenus} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

