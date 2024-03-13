import express from 'express';
import { getMenus, getMenuItem, getItemsOnRestaurantMenu, updateMenuItem, deleteMenuItem, addMenuItem } from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenus);
router.get('/:id', getMenuItem);
router.get('/restaurant/:restId', getItemsOnRestaurantMenu);
router.patch('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);
router.post('/', addMenuItem);

export default router;