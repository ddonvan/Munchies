// CartPage.jsx
import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/header/header.component';
import { useCart } from './CartContext'; // Import useCart hook
import { MenuList } from '../../components/menu/menuList/menuList.component'; 
import { OrderList } from '../../components/orders/orderList/orderList.component';
import axios from 'axios';
import { Order } from '../../components/orders/orderCard/orderCard.component';
import { useData } from '../HomePage/HomePage';
import './CartPage.styles.css' ;

const CartPage = () => {
  
  const { cart } = useCart(); // Access cart state from the context
  // const [orders, setOrders] = useState([]);

  // //Order Fetch
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const response = await axios.get(
  //       'http://localhost:8000/orders',
  //     );
  //     setOrders(response.data);
  //   };
  //   fetchOrders();
  // }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Karla:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link> 
      <PageHeader/>
        <div className='cart-overview'>
          <h2 style={{textAlign: 'center', paddingBottom:'20px', paddingTop:'10px'}}>Cart Overview</h2>
        </div>
      {/* <ul>
        {Object.entries(cart).map(([itemId, quantity]) => (
          <li key={itemId}>
            Item ID: {itemId}, Quantity: {quantity}
          </li>
        ))}
      </ul> */}
      <OrderList/>
    </div>
  );
};

export default CartPage;
