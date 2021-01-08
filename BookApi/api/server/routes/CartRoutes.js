import {Router} from "express";
import CartController from "../controllers/CartController";

const router = Router();

router.get("/", CartController.index);
router.post("/", CartController.store);
router.delete("/remove-cart", CartController.cart_remove);
router.delete("/", CartController.destroy);

export default router;