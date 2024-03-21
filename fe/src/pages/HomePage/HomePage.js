import { RestaurantList } from '../../components/restaurants/restaurantList/restaurantList.component';
import { PageHeader } from '../../components/header/header.component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.styles.css' ;


function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
  
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
  
  
        <div className='Restaurants'>
          <h2>Restaurants</h2>
          <RestaurantList restaurants={restaurants} menus={menus}/>
        </div>
  
  
      </div>
    );
  }
  
  export default HomePage;
  