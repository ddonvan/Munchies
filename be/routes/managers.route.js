import express from "express";
import { getManagers, getManager, addManager, updateManager, getManagersFromRestaurant } from "../controllers/manager.controller.js";

const router = express.Router();

router.get("/", getManagers);
router.get("/:id", getManager);
router.get('/restaurant/:restId', getManagersFromRestaurant);
router.post('/', addManager);
router.patch("/update/:id", updateManager);

export default router;