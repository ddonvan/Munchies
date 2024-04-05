import { PageHeader } from '../../components/header/header.component';
import { ManagerMenuList } from '../../components/menu/managerMenu/managerMenuList/managerMenuList';
import { ManagerOrderList } from '../../components/orders/managerOrders/managerOrderList/managerOrderList';
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import './ManagerPage.styles.css' ;
import { Analytics } from '../../components/menu/analytics/analytics.component';
import Dropdown from 'react-bootstrap/Dropdown';
import header from './restaurant.jpg';

function ManagerPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const [managers, setManagers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currentRest, setCurrentRest] = useState("");
    const [currentMenu, setCurrentMenu] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selection, setSelection] = useState("");
    const [selectedManager, setSelectedManager] = useState("");
    const [filtered, setfiltered] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        availability: ""
    });
    const [selectedManagerName, setSelectedManagerName] = useState("Select Manager");
    const ordersRef = React.useRef(null);
    const menuRef = React.useRef(null);
    const analyticsRef = React.useRef(null);



    
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
  
    //Menu fetching
    const fetchMenus = async () => {
        const response = await axios.get(
          'http://localhost:8000/menus'
        );
        
        setMenus(response.data);
      };


      useEffect(() => {
      const setMenu = async () => {
        if(currentRest){
          const filteredMenus = menus.filter(menu => menu.rest_id === currentRest);
            setCurrentMenu(filteredMenus);
      }
        
      };
      setMenu();
    }, [menus]);

    const handleInProgress = () => {
      setSelection("in progress");
      const filteredOrders = orders.filter(order => order.restaurant_id === currentRest  && order.status === "In Progress");
      setCurrentOrders(filteredOrders);
    };
  
    const handleOrdered = () => {
      setSelection("ordered");
      const filteredOrders = orders.filter(order => order.restaurant_id === currentRest  && order.status === "Ordered");
      setCurrentOrders(filteredOrders);
    };
  
    const handleComplete = () => {
      setSelection("completed");
      const filteredOrders = orders.filter(order => order.restaurant_id === currentRest  && order.status === "Completed");
      setCurrentOrders(filteredOrders);
    };

    const handleAwaiting = () => {
      setSelection("awaiting pickup");
      const filteredOrders = orders.filter(order => order.restaurant_id === currentRest  && order.status === "Awaiting Pickup");
      setCurrentOrders(filteredOrders);
    };


    useEffect(() => {
      const setOrder = async () => {
        if(currentRest){
          let filteredOrders = []
          if(selection === ""){
            filteredOrders = orders.filter(order => order.restaurant_id === currentRest  && order.status !== "pending" && order.status !== "Completed");
          } else if (selection === "completed") {
            filteredOrders = orders.filter(order => order.restaurant_id === currentRest  && order.status === "Completed");
          }
            
            setCurrentOrders(filteredOrders);
      }
        
      };
      setOrder();
    }, [orders]);

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

const fetchOrders = async () => {
  try {
      const response = await axios.get('http://localhost:8000/orders');
      setOrders(response.data);
  } catch (error) {
      console.error('Error fetching orders:', error);
  }
};

    // useEffect hook for fetching orders (optional)
    useEffect(() => {
        fetchMenus();
        fetchOrders();
    }, []);

    useEffect(() => {
        if (currentRest !== "") {
            fetchMenus();
        }
    }, [currentRest]);
    

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

      const handleManagerSelect = (selectedManager) => {
        const restID = selectedManager.restaurant_id;
        setCurrentRest(restID);
        const filteredMenus = menus.filter(menu => menu.rest_id === restID);
        const filteredOrders = orders.filter(order => order.restaurant_id === restID && order.status !== "pending");
        setCurrentMenu(filteredMenus);
        setCurrentOrders(filteredOrders);
        setSelectedManagerName(`${selectedManager.firstName} ${selectedManager.lastName}`);
        setSelectedManager(selectedManager);
        setfiltered(filteredOrders);
    };
    

      const handleAddClick = () => {
        setShowModal(true); // Open Modal
    };

    const handleCloseModal = async () => {
        setShowModal(false); // Close Modal
    };

    // const handleDeleteMenuItem = (deletedItem) => {
    //   const updatedMenus = menus.filter(item => item._id !== deletedItem._id);
    //   setMenus(updatedMenus);
    // };


    const handleSaveModal = async () => {
      const name = formData["name"];
      const category = formData["category"];
      const image = formData["image"];
      const price = formData["price"];
      let availability = "";

      if(formData["availability"] === ""){
        availability = "available";
      }
      else {
        availability = formData["availability"];
      }
  
      try {            
          await axios.post(`http://localhost:8000/menus/`, 
          { 
              "rest_id": currentRest, 
              "item_id": orders.length ,
              "item_name": name,
              "category": category,
              "imageURL": image,
              "price": price,
              "frequency": 0, 
              "status": availability 
          });
          console.log("Item updated");
  
          fetchMenus();
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
  
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    

  
    return (
        <div className="ManagerPage" >
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Karla:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>   

<div className='Welcome' >
        
        <div className='background-image'></div>
        <div className='text-content'>
        <div className='firstline'>
                Welcome
                <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedManagerName}
                </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {managers.map((entry, index) => (
                            <Dropdown.Item key={index} onClick={() => handleManagerSelect(entry)}>

                                {entry.firstName} {entry.lastName}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                to your Manager Hub.
            </div>
            <div className='thirdline'>Manage menus, monitor orders, approve requests, and track insights all in one place.</div>

        </div>

            
        </div>


  <PageHeader menuRef={menuRef}  ordersRef={ordersRef}  analyticsRef={analyticsRef}  />
  <div className="manager-page">
  
  {currentMenu.length > 0 && (
    <div>
        <div className='menuTitle' ref={menuRef}>Menu Items </div>
        <div className='menuItemsContainer'>
          <Button className='addItem' variant='outline-success' onClick={handleAddClick}><strong>Add Menu Item</strong></Button>
          <ManagerMenuList menus={currentMenu} fetchMenus={fetchMenus} /></div>
        
    </div>
)}


{selectedManager && (
  <div className='entireOrders' ref={ordersRef}>
    <div className='ordersTitle'>Orders</div>
    <div className='ordersContainer'>
    <Button onClick={handleOrdered}>Ordered</Button>
    <Button onClick={handleInProgress}>In Progress</Button>
    <Button onClick={handleAwaiting}>Awaiting Pickup</Button>
    <Button onClick={handleComplete}>Completed</Button>
    <ManagerOrderList orders={currentOrders} fetchOrders={fetchOrders}/>
    </div>
  </div>
)}

  </div>

  {currentRest && (
    <div className='entireAnalytics' ref={analyticsRef}>
       <Analytics orders={filtered} menus={menus} currentMenu={currentMenu} />
    </div>
 
)}

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
                    <select id="availability" name="availability" value={formData.availability} onChange={handleInputChange}>
                        <option value="available">Available</option>
                        <option value="sold-out">Sold Out</option>
                    </select>

                </form>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleSaveModal}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
</div>

      
    );
  }
  
export default ManagerPage;
