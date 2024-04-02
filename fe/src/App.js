// App.js or index.js
import React from 'react';
import { CartProvider } from './pages/CartPage/CartContext';
import { DataProvider } from './pages/HomePage/DataContext';
import { OurRoutes } from './routes'; // Assuming this is where your routes are defined
import { CustomerIdProvider } from './pages/HomePage/CustomerContext';

function App() {
  return (
    <DataProvider>
      <CustomerIdProvider>
        <CartProvider>
          <OurRoutes />
        </CartProvider>
      </CustomerIdProvider>
    </DataProvider>
  );
}

export default App;
