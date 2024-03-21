import React, { useState } from 'react';
import './App.css';
import { OurRoutes } from './routes';

function App() {
  // State for cart items
  const [cart, setCart] = useState({});

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1
    }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId]--;
      }
      return updatedCart;
    });
  };

  return (
    <div className="App">
      {/* Render the routes */}
      <OurRoutes cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
