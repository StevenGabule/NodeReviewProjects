import {Router} from "express";
import UserController from "../controllers/UserController";

const router = Router();
/*
* register
* login
* logout
* profile
* edit account
* delete account or deactivate*/
router.get("/all", UserController.index);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/:id", UserController.profile);
router.put("/:id", UserController.profile_update);
router.delete("/:id", UserController.destroy);

export default router;