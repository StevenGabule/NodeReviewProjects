import CartService from "../services/CartService";
import Util from "../utils/Utils";
import jwt from "jsonwebtoken";

const util = new Util();

class CartController {

    static async index(req, res) {
        try {
            if (!("authorization" in req.headers)) {
                util.setError(401, "No authorization token");
                return util.send(res);
            }
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const carts = await CartService.index(id);
            if (carts.length > 0) {
                util.setSuccess(200, "carts", carts);
            } else {
                util.setSuccess(200, "Empty Carts")
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

        if (!req.body.bookId || !req.body.qty) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }

        const cart = req.body;
        try {
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const createCart = await CartService.store_cart(id, cart);
            util.setSuccess(201, "Added to cart", createCart);
            return util.send(res);
        } catch (e) {
            util.setError(400, e.message);
            return util.send(res);
        }
    }

    static async cart_remove(req, res) {

        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }

        if (!req.body.id) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }

        const {id: customerId} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        if (!Number(customerId)) {
            util.setError(400, "Please input a number value!");
            return util.send(res);
        }

        try {
            const {id: cartId} = req.body;
            const result = await CartService.remove_cart(customerId, cartId);
            if (result) {
                util.setSuccess(200, "cart has been deleted!");
            } else {
                util.setError(404, `Oop! something went wrong!`);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async destroy(req, res) {
        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }
        const {id: customerId} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        try {
            const result = await CartService.destroy(customerId);
            if (result) {
                util.setSuccess(200, "All carts has been deleted!");
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

export default CartController;