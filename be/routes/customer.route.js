import express from "express";
import { getCustomers, getCustomer, addCustomer } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getCustomers); // route for getting all customers
router.get("/:id", getCustomer); // route for getting a customer using id
router.post('/', addCustomer); // route for adding a customer

export default router;