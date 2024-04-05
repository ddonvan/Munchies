import express from "express";
import { getManagers, getManager, addManager, updateManager, getManagersFromRestaurant } from "../controllers/manager.controller.js";

const router = express.Router();

router.get("/", getManagers); // route for getting all managers
router.get("/:id", getManager); // route for getting a manager using id
router.get('/restaurant/:restId', getManagersFromRestaurant); // getting managers from a restaurant using restaurant id
router.post('/', addManager); // route for adding a manager
router.patch("/update/:id", updateManager); // route for updating a manager using id

export default router;