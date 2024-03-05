import express from "express";
import { getRestaurants, getRestaurant, updateItemQuantity } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.patch("/:id/item/:item_id/quantity/:quantity", updateItemQuantity);

export default router;