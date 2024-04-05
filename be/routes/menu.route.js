import express from 'express';
import { getMenus, getMenuItem, getItemsOnRestaurantMenu, updateMenuItem, deleteMenuItem, addMenuItem } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenus); // route for getting all menus
router.get('/:id', getMenuItem); // route for getting a menu item using id
router.get('/restaurant/:restId', getItemsOnRestaurantMenu); // route for getting items from a restaurant using restID
router.patch('/:id', updateMenuItem); // route for updating a menu item
router.delete('/:id', deleteMenuItem); // route for deleting a menu item
router.post('/', addMenuItem); // route for adding a menu item

export default router;