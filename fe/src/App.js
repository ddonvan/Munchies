import './App.css';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantList } from './components/restaurants/restaurantList/restaurantList.component';
import { PageHeader } from './components/header/header.component';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
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

  //Menu Item Filtering
  // const handleOrderClick= (restId) => {
  //   setSelectedRestId(restId);
  // };

  // const filteredMenuItems = selectedRestId ? menus.filter(item => item.rest_id === selectedRestId) : [];


  return (
    <div className="App">
      <PageHeader/>


      <div className='Restaurants'>
        <h2>Restaurants</h2>
        <RestaurantList restaurants={restaurants} menus={menus}/>
      </div>

      {/* <div className='Menu'>
        <h3>Menu List</h3>
        <MenuComponent></MenuComponent>
      </div> */}


    </div>
  );
}

export default App;
