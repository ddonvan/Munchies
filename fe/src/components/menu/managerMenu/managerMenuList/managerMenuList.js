import React, { useState } from "react";
import { ManagerMenu } from "../managerMenuCard/managerMenuCard";
import Button from "react-bootstrap/Button";
import "./managerMenuList.styles.css";

export const ManagerMenuList = ({ menus, onDeleteMenuItem}) => {
    
    const [localCart, setLocalCart] = useState({}); // Local state for handling UI updates

    return (
        <div className="managermenuList">
            {menus.map(menu => (
                <div key={menu.item_name} className="menu-item">
                    <ManagerMenu key={menu.item_name} menu={menu} onDeleteMenuItem={onDeleteMenuItem}/>  
        
                </div>
            ))}
        </div>
    );
}