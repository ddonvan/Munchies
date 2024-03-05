import express from "express";
import { getRestaurants, getRestaurant, addMenuItem, updateItemQuantity, deleteMenuItem } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.patch("/add/:id", addMenuItem);
router.patch("/delete/:id", deleteMenuItem);
router.patch("/update/:id/:item_id", updateItemQuantity);

export default router;