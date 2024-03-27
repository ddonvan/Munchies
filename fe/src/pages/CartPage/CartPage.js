// CartPage.jsx
import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/header/header.component';
import { useCart } from './CartContext'; // Import useCart hook
import { MenuList } from '../../components/menu/menuList/menuList.component'; 
import { OrderList } from '../../components/orders/orderList/orderList.component';
import axios from 'axios';
import { Order } from '../../components/orders/orderCard/orderCard.component';
import { useData } from '../HomePage/HomePage';

const CartPage = () => {
  
  const { cart } = useCart(); // Access cart state from the context
  const [orders, setOrders] = useState([]);

  //Order Fetch
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        'http://localhost:8000/orders',
      );
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

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
      <OrderList orders={orders}/>
    </div>
  );
};

export default CartPage;