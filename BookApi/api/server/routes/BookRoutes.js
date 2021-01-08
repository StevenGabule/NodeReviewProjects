import {Router} from "express";
import BookController, {resizeImage, uploadImage} from "../controllers/BookController";

const catchErrors = fn => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

const router = Router();

router.get("/", BookController.index);
router.post("/", uploadImage, catchErrors(resizeImage), BookController.store);
router.get("/:id", BookController.show);
router.put("/:id", uploadImage, catchErrors(resizeImage), BookController.update);
router.delete("/:id", BookController.destroy);

export default router;