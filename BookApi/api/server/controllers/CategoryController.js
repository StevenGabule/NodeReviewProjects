import CategoryService from "../services/CategoryService";
import Util from "../utils/Utils";

const util = new Util();

class CategoryController {

    static async index(req, res) {
        try {
            const category = await CategoryService.index();
            if (category.length > 0) {
                util.setSuccess(200, "category", category);
            } else {
                util.setSuccess(200, "No category available")
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async store(req, res) {
        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }

        if (!req.body.name) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }

        const cart = req.body;
        try {
            const createCategory = await CategoryService.store(cart);
            util.setSuccess(201, "Successfully added a new category", createCategory);
            return util.send(res);
        } catch (e) {
            util.setError(400, e.message);
            return util.send(res);
        }
    }

    static async update(req, res) {
        const {id, name} = req.body;
        if (!Number(id)) {
            util.setError(400, "Please input a valid number!");
            return util.send(res);
        }

        if (!req.body.name) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }

        try {
            const result = await CategoryService.update(id, name);
            if (!result) {
                util.setError(404, `Can't update the ${id}`);
            } else {
                util.setSuccess(200, "Category has been updated successfully!", result);
            }
            return util.send(res);
        } catch (e) {
            util.setError(404, e)
            return util.send(res)
        }
    }

    static async destroy(req, res) {
        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }
        const {id} = req.body;
        if (!id) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }
        try {
            const result = await CategoryService.destroy(id);
            if (result) {
                util.setSuccess(200, `Category no: ${id} has been deleted!`);
            } else {
                util.setError(404, `Oops! Something went wrong!`);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }
}

export default CategoryController;