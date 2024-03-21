import React, { useState } from "react";
import { Menu } from "../menuCard/menuCard.component";
import Button from "react-bootstrap/Button";
import './menuList.styles.css';


export const MenuList = ({ menus }) => {
    const [cart, setCart] = useState({});

    const addToCart = (itemId) => {
        setCart(prevCart => ({
            ...prevCart,
            [itemId]: (prevCart[itemId] ||0) + 1
        }));
    };

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
        <div className="menuList">
            {menus.map(menu => (
                <div key={menu.item_name} className="menu-item">
                    <Menu key={menu.item_name} menu={menu}/>  
                    <div className="menu-item-actions">
                        <div className="quantity-selector">
                            <Button onClick={() => removeFromCart(menu.item_id)}>-</Button>
                            <span>{cart[menu.item_id] || 0}</span>
                            <Button onClick={() => addToCart(menu.item_id)}>+</Button>
                        </div>
                        <Button className="add-to-cart">Add to Cart</Button>
                    </div>
                </div>
            ))}
        </div>
    )
    
    // return(
    //     <div className="menuList">
    //         {menus.map(menu => (
    //             <Menu key={menu.item_name} menu={menu}/>       
    //         ))}
    //     </div>
    // )
} 