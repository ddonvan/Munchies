import express from "express";
import { getCustomers, getCustomer } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);

export default router;