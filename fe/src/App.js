// App.js or index.js
import React from 'react';
import { CartProvider } from './pages/CartPage/CartContext';
import { DataProvider } from './pages/HomePage/DataContext';
import { OurRoutes } from './routes'; // Assuming this is where your routes are defined

function App() {
  return (
    <DataProvider>
      <CartProvider>
        <OurRoutes />
      </CartProvider>
    </DataProvider>
  );
}

export default App;
