import { RestaurantList } from '../../components/restaurants/restaurantList/restaurantList.component';
import { PageHeader } from '../../components/header/header.component';
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './HomePage.styles.css' ;
import { useCustomerId } from './CustomerContext';

function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const { customers, handleCustomerSelect } = useCustomerId();
    const menuRef = React.useRef(null);
    const ordersRef = React.useRef(null);
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
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Karla:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>   

      <PageHeader menuRef={menuRef} ordersRef={ordersRef} analyticsRef={analyticsRef} />
            <img 
                  src={require('./header-image.jpg')} 
                  style={{ 
                    maxWidth: '100%', 
                    height: '10%', 
                    marginTop: '-240px',
                    filter: 'brightness(35%)',
                  }} />
          <div className="container">
          <div className="orange-box">
            <div className="text">
              <div className="inline-container">
                <h4 className='home-text'>Hi </h4>
                <select name='select-for-customer' onChange={handleCustomerSelect} className='custom-select'>
                  <option value="default" className='defualt-option'>Customer</option>
                  {customers.map((entry, index) => (
                    <option key={index}>{entry.firstName} {entry.lastName}</option>
                  ))}
                </select>
              </div>
              <h4 className='home-text'>
              Welcome to MUNCHIES! <br />
              </h4>
              <h5 className='home-text'>
              Satisfy cravings in just a tap. <br />
              Explore top restaurants below.
              </h5>
            </div>
            <div className="svg-container">
              <a href="#Restaurants">
              <svg width="55" height="55" viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}>
                  <path d="M3 41L40 66.1719" stroke="white" strokeWidth="5" strokeLinecap="round"/> 
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
            <h2 style={{paddingBottom:'20px', paddingTop:'10px', marginTop: '20px', fontWeight: 'bolder'}}>Restaurants</h2>
            <RestaurantList restaurants={restaurants} menus={menus}/>
          </div>
    
          
        </div>
      
    );
  }
  
export default HomePage;

  