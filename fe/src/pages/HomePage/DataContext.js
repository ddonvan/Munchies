// DataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    
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

