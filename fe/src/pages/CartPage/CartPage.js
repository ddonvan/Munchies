import React from 'react';
import { PageHeader } from '../../components/header/header.component';
import Button from "react-bootstrap/Button";



const CartPage = () => {
 
  return (
    <div>
      <PageHeader/>

      <h2>Cart Overview</h2>
      <Button className="add-to-cart">Place Order</Button>

      
    </div>
  );
};

export default CartPage;
