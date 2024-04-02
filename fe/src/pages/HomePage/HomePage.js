import { RestaurantList } from '../../components/restaurants/restaurantList/restaurantList.component';
import { PageHeader } from '../../components/header/header.component';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.styles.css' ;
import { useCustomerId } from './CustomerContext';

function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const { customers, handleCustomerSelect } = useCustomerId();
    // const [customers, setCustomers] = useState([]);
    // const [customerId, setCustomerId] = useState('');

    // //Customer fetching
    // useEffect(() => {
    //   const fetchCustomers = async () => {
    //     const response = await axios.get(
    //       'http://localhost:8000/customers'
    //     );
    //     setCustomers(response.data);
    //   };
    //   fetchCustomers();
    // }, []);

    // const handleCustomerSelect = (e) => {
    //   const selectedCustomerId = e.target.selectedIndex-1;
    //   const selectedCustomer = customers[selectedCustomerId];
    //   const cId = selectedCustomer["_id"];
    //   console.log(cId);
    //   setCustomerId(cId);
    // }
    
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
  
  
    return (
      
        <div className="HomePage">
          <PageHeader/>
            <img 
                  src={require('./header-image.jpg')} 
                  style={{ 
                    maxWidth: '100%', 
                    height: '10%', 
                    marginTop: '-240px'}} />
          <div className="container">
          <div className="orange-box">
            <div className="text">
              <h4>
              Welcome to MUNCHIES! <br />
              Satisfy cravings in a tap. <br />
              Explore top restaurants below.
              </h4>
            </div>
            <div className="svg-container">
              <a href="#Restaurants">
                <svg width="40" height="34.5" viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 41L40 66.1719" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M77 41L40.1719 66" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M3 22L40 47.1719" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M77 22L40.1719 47" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M3 3L40 28.1719" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M77 3L40.1719 28" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
          </div>

          <div id='Restaurants' className='Restaurants'>
            <h2 style={{paddingBottom:'20px', paddingTop:'10px', marginTop: '20px'}}>Restaurants</h2>
            <select name='select-for-customer' onChange={handleCustomerSelect}>
              <option value="default" className='defualt-option'>Select Customer</option>
              {customers.map((entry, index) => (
                <option ley={index}>{entry.firstName} {entry.lastName}</option>
              ))}
            </select>
            <RestaurantList restaurants={restaurants} menus={menus}/>
          </div>
    
          
        </div>
      
    );
  }
  
export default HomePage;

  