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
router.get("/profile", UserController.profile);
router.put("/update", UserController.profile_update);
router.put("/update/password", UserController.change_password);
router.delete("/:id", UserController.destroy);

export default router;