import {Router} from "express";
import OrderController from "../controllers/OrderController";

const router = Router();

router.get("/", OrderController.index);
router.post("/", OrderController.store);
router.delete("/", OrderController.destroy);

export default router;