// CartPage.jsx
import React from 'react';
import { PageHeader } from '../../components/header/header.component';
import { useCart } from './CartContext'; // Import useCart hook
import { MenuList } from '../../components/menu/menuList/menuList.component'; 

const CartPage = () => {
  const { cart } = useCart(); // Access cart state from the context

  return (
    <div>
      <PageHeader/>
      <h2>Cart Overview</h2>
      <ul>
        {Object.entries(cart).map(([itemId, quantity]) => (
          <li key={itemId}>
            Item ID: {itemId}, Quantity: {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;