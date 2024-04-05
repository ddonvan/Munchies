// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

// context to use restaurant and menu data
export const DataProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    
    // restaurant fetching
    useEffect(() => {
        const fetchRestaurants = async () => {
          const response = await axios.get(
            'http://localhost:8000/restaurants',
            );
            setRestaurants(response.data);
        };
        fetchRestaurants();
      }, []);

    // menu fetching
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
        <DataContext.Provider value={{ restaurants, menus }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);

