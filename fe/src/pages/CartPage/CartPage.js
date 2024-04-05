// CartPage.jsx
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
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
  const [currentMenu, setCurrentMenu] = useState("");

  const handleInProgress = () => {
    setCurrentMenu("in progress");
};

  const handleCart = () => {
    setCurrentMenu("");
  };

  const handleComplete = () => {
    setCurrentMenu("completed");
  };


  return (
    <div style={{ marginTop: '100px' }}>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Karla:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link> 
  <PageHeader/>
  <div className='cart-overview' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div>
        {currentMenu !== "cart" && <Button id="see-cart" onClick={handleCart}><strong>See Current Orders</strong></Button>}
    </div>
    <div style={{ paddingLeft: currentMenu === "cart" ? '220px' : currentMenu === "in progress" ? '38px' : currentMenu === "completed" ? '40px' : '220px' }}>
        <h2>Orders Overview</h2>
    </div>
    <div>
        {currentMenu !== "in progress" && <Button id="see-inprogress" onClick={handleInProgress}><strong>See In Progress</strong></Button>}
        {currentMenu !== "completed" && <Button id="see-completed" onClick={handleComplete}><strong>See Completed</strong></Button>}
    </div>
</div>

  <OrderList selected={currentMenu}/>
</div>

  );
};

export default CartPage;
