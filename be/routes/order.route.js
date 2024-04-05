import express from "express";
import { getOrders, getOrder, createOrder, addOrderItem, updateStatus, deleteOrderItem, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders); // route for getting all orders
router.get("/:id", getOrder); // route for getting an order using id
router.post("/", createOrder); // route for creating an order
router.patch("/add/:id", addOrderItem); // routing for adding an item to an order
router.patch("/delete/:id", deleteOrderItem); // route for deleting an item from an order
router.patch("/update/:id", updateStatus); // route for updating status of an order
router.delete("/delete/order/:id", deleteOrder); // route for deleting an order

export default router;