import express from "express";
import { getOrders, getOrder, createOrder, addOrderItem, updateStatus, deleteOrderItem, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.patch("/add/:id", addOrderItem);
router.patch("/delete/:id", deleteOrderItem);
router.patch("/update/:id", updateStatus);
router.delete("/delete/order/:id", deleteOrder);

export default router;