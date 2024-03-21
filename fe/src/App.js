// App.js or index.js
import React from 'react';
import { CartProvider } from './pages/CartPage/CartContext';
import { OurRoutes } from './routes'; // Assuming this is where your routes are defined

function App() {
  return (
    <CartProvider>
      <OurRoutes />
    </CartProvider>
  );
}

export default App;
