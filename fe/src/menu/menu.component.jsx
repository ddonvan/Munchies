import React, { useEffect, useState } from "react";
import axios from "axios";

console.log("working on new branch")

export const MenuComponent = ({}) => {
    const [menus, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/menus');
                setMenu(response.data);
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };
        fetchMenus();
    }, []);

    return (
        <div className="Menu-card">
            <ul>
                {menus.map((menu,index) => (
                    <p key={index}>
                        {menu.item_name}: $ 
                        {menu.price}
                    </p>
                ))}
            </ul>

        </div>
    )
}

export default MenuComponent