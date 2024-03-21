import React, { useState } from "react";
import { Menu } from "../menuCard/menuCard.component";
import Button from "react-bootstrap/Button";
import './menuList.styles.css';
import { useCart } from '../../../pages/CartPage/CartContext'; 

export const MenuList = ({ menus }) => {
    const { addToCart, removeFromCart } = useCart(); // Access addToCart and removeFromCart functions from the context
    const [localCart, setLocalCart] = useState({}); // Local state for handling UI updates

    const handleAddToCart = (itemId) => {
        setLocalCart(prevLocalCart => ({
            ...prevLocalCart,
            [itemId]: (prevLocalCart[itemId] || 0) + 1
        }));
        addToCart(itemId); // Call addToCart function
    };

    const handleRemoveFromCart = (itemId) => {
        if (localCart[itemId] > 0) {
            setLocalCart(prevLocalCart => ({
                ...prevLocalCart,
                [itemId]: prevLocalCart[itemId] - 1
            }));
            removeFromCart(itemId); // Call removeFromCart function
        }
    };

    return (
        <div className="menuList">
            {menus.map(menu => (
                <div key={menu.item_name} className="menu-item">
                    <Menu key={menu.item_name} menu={menu}/>  
                    <div className="menu-item-actions">
                        <div className="quantity-selector">
                            <Button onClick={() => handleRemoveFromCart(menu._id)}>-</Button>
                            <span>{localCart[menu._id] || 0}</span>
                            <Button onClick={() => handleAddToCart(menu._id)}>+</Button>
                        </div>
                        <Button>Add to Cart</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
