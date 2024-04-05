import express from "express";
import { getRestaurants, getRestaurant, addRestaurant, updateRestaurant } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants); // route for getting all restaurants
router.get("/:id", getRestaurant); // route for getting a restaurant
router.post('/', addRestaurant); // route for adding a restaurant
router.patch("/update/:id", updateRestaurant); // route for updating a restaurant

export default router;