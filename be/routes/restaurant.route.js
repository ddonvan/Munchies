import express from "express";
import { getRestaurants, getRestaurant, addRestaurant, updateRestaurant } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post('/', addRestaurant);
router.patch("/update/:id", updateRestaurant);

export default router;