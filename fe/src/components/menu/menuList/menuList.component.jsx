// MenuList.component.jsx
import React from "react";
import { Menu } from "../menuCard/menuCard.component";
import Button from "react-bootstrap/Button";
import './menuList.styles.css';
import { useCart } from '../../../pages/CartPage/CartContext'; // Import useCart hook

export const MenuList = ({ menus }) => {
    const { addToCart } = useCart(); // Access addToCart function from the context

    return (
        <div className="menuList">
            {menus.map(menu => (
                <div key={menu.item_name} className="menu-item">
                    <Menu key={menu.item_name} menu={menu}/>  
                    <div className="menu-item-actions">
                        <Button onClick={() => addToCart(menu.item_id)} className="add-to-cart">Add to Cart</Button> {/* Call addToCart function on button click */}
                    </div>
                </div>
            ))}
        </div>
    );
}
