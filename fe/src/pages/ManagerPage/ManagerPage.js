import { RestaurantList } from '../../components/restaurants/restaurantList/restaurantList.component';
import { PageHeader } from '../../components/header/header.component';
import { ManagerMenuList } from '../../components/menu/managerMenu/managerMenuList/managerMenuList';
import { ManagerOrderList } from '../../components/orders/managerOrders/managerOrderList/managerOrderList';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import './ManagerPage.styles.css' ;

function ManagerPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const [managers, setManagers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currentMenu, setCurrentMenu] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);

    
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
    useEffect(() => {
      const fetchMenus = async () => {
        const response = await axios.get(
          'http://localhost:8000/menus'
        );
        setMenus(response.data);
      };
      fetchMenus();
    }, []);

    //Order Fetching
    useEffect(() => {
        const fetchOrders = async () => {
          const response = await axios.get(
            'http://localhost:8000/orders'
          );
          setOrders(response.data);
        };
        fetchOrders();
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
        const filteredMenus = menus.filter(menu => menu.rest_id === restID);
        const filteredOrders = orders.filter(order => order.restaurant_id === restID);
        console.log("Manager's restaurant", restID);
        console.log("Orders", filteredOrders);
        setCurrentMenu(filteredMenus);
        setCurrentOrders(filteredOrders);
      }
  
  
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
        <h2>Menu Items <Button className='addItem'>+</Button></h2>
        <ManagerMenuList menus={currentMenu} />
    </div>
)}


{currentOrders.length > 0 && (
  <div>
    <h2>Orders</h2>
    <ManagerOrderList orders={currentOrders} />
  </div>
)}

  </div>
</div>

      
    );
  }
  
export default ManagerPage;
