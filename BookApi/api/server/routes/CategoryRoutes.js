import {Router} from "express";
import CategoryController from "../controllers/CategoryController";

const CategoryRouter = Router();

CategoryRouter.get("/", CategoryController.index);
CategoryRouter.post("/", CategoryController.store);
CategoryRouter.put("/", CategoryController.update);
CategoryRouter.delete("/", CategoryController.destroy);

export default CategoryRouter;