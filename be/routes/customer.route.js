import express from "express";
import { getCustomers, getCustomer, addCustomer } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post('/', addCustomer);

export default router;