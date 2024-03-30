import { PageHeader } from '../../components/header/header.component';
import { ManagerMenuList } from '../../components/menu/managerMenu/managerMenuList/managerMenuList';
import { ManagerOrderList } from '../../components/orders/managerOrders/managerOrderList/managerOrderList';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import './ManagerPage.styles.css' ;

function ManagerPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const [managers, setManagers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currentRest, setCurrentRest] = useState("");
    const [currentMenu, setCurrentMenu] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        availability: ""
    });

    
    //Restaurant fetching
    useEffect(() => {
      const fetchRestaurants = async () => {
        const response = await axios.get(
          'http://localhost:8000/restaurants',
          );
          setRestaurants(response.data);
      };
      fetchRestaurants();
    }, []);
  

    useEffect(() => {
      const fetchMenus = async () => {
        const response = await axios.get(
          'http://localhost:8000/menus'
        );
        
        setMenus(response.data);
        if(currentRest){
            setMenu();
        }
      };
      fetchMenus();
    }, [formData]);

      const setMenu = async () => {
        const filteredMenus = menus.filter(menu => menu.rest_id === currentRest);
            const filteredOrders = orders.filter(order => order.restaurant_id === currentRest);
            setCurrentMenu(filteredMenus);
            setCurrentOrders(filteredOrders);
      }

    //Order Fetching
    useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    fetchOrders()
}, []);
    

    //Manager Fetching
    useEffect(() => {
        const fetchManagers = async () => {
          const response = await axios.get(
            'http://localhost:8000/managers'
          );
          setManagers(response.data);
        };
        fetchManagers();
      }, []);

      const handleManagerSelect = (e) => {
        const selectedManagerId = e.target.selectedIndex-1;
        const selectedManagerInfo = managers[selectedManagerId];
        const restID = selectedManagerInfo["restaurant_id"];
        setCurrentRest(restID);
        const filteredMenus = menus.filter(menu => menu.rest_id === restID);
        const filteredOrders = orders.filter(order => order.restaurant_id === restID);
        setCurrentMenu(filteredMenus);
        setCurrentOrders(filteredOrders);
      }

      const handleAddClick = () => {
        setShowModal(true); // Open Modal
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Close Modal
    };

    const handleSaveModal = async () => {
      const name = formData["name"];
      const category = formData["category"];
      const image = formData["image"];
      const price = formData["price"];
      const availability = formData["availability"];
  
      try {            
          await axios.post(`http://localhost:8000/menus/`, 
          { "rest_id": currentRest, 
          "item_id": orders.length ,
          "item_name": name,
          "category": category,
          "imageURL": image,
          "price": price,
          "frequency": 0, 
          "status": availability });
          console.log("Item updated");
  
          // Update the menus state variable
          const updatedMenus = [...menus, {
              rest_id: currentRest,
              item_id: orders.length,
              item_name: name,
              category: category,
              imageURL: image,
              price: price,
              frequency: 0,
              status: availability
          }];
          setMenus(updatedMenus);
  
          // Update currentMenu
          setMenu();
      } catch (e) {
          console.error("Error updating item:", e);
      }
      
      setFormData({
          name: "",
          category: "",
          image: "",
          price: "",
          availability: ""
      });
      setShowModal(false); // Close Modal
  };

  const handleDeleteMenuItem = (deletedItem) => {
    const updatedMenus = menus.filter(item => item._id !== deletedItem._id);
    setMenus(updatedMenus);
  };

  

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
  
  
    return (
<div className="ManagerPage">
  <PageHeader />
  <div className="manager-page">
  <div className='combo-box'>
    <select name="select-for-manager" onChange={handleManagerSelect}>
      <option value="default" className="default-option">Select Manager</option>
      {managers.map((entry, index) => (
        <option key={index}>{entry.firstName} {entry.lastName}</option>
      ))}
    </select>
    <br />
    <br />
  </div>
  {currentMenu.length > 0 && (
    <div>
        <h2>Menu Items <Button className='addItem' onClick={handleAddClick}>+</Button></h2>
        <ManagerMenuList menus={currentMenu} onDeleteMenuItem={handleDeleteMenuItem}/>
    </div>
)}


{currentOrders.length > 0 && (
  <div>
    <h2>Orders</h2>
    <ManagerOrderList orders={currentOrders} />
  </div>
)}

  </div>

  <Modal show={showModal} onHide={handleCloseModal} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add an Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    <form>
                    <label htmlFor="name">Item Name: </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} /><br /><br />
                    <label htmlFor="category">Category: </label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} /><br /><br />
                    <label htmlFor="image">Image URL: </label>
                    <input type="url" id="image" name="image" value={formData.image} onChange={handleInputChange} /><br /><br />
                    <label htmlFor="price">Price: </label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} /><br /><br />
                    <label htmlFor="availability">Availability: </label>
                    <input type="text" id="availability" name="availability" value={formData.availability} onChange={handleInputChange} /><br /><br />
                </form>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSaveModal}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
</div>

      
    );
  }
  
export default ManagerPage;
