import Util from "../utils/Utils";
import jwt from "jsonwebtoken";
import OrderService from "../services/OrderService";

const util = new Util();

class OrderController {

    static async index(req, res) {
        try {
            if (!("authorization" in req.headers)) {
                util.setError(401, "No authorization token");
                return util.send(res);
            }
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const carts = await OrderService.index(id);
            if (carts.length > 0) {
                util.setSuccess(200, "Order available", carts);
            } else {
                util.setSuccess(200, "No orders available")
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

        if (!req.body.deliveryDate ||
            !req.body.streetId ||
            !req.body.barangayId ||
            !req.body.municipalityId ||
            !req.body.supplierFee ||
            !req.body.note
        ) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }

        const order = req.body;
        try {
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const createOrder = await OrderService.store(id, order);
            util.setSuccess(201, "Your order has been placed.", createOrder);
            return util.send(res);
        } catch (e) {
            util.setError(400, e.message);
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
            const {orderId} = req.body;
            const result = await OrderService.destroy(customerId, orderId);
            if (result) {
                util.setSuccess(200, "Order has been deleted!");
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

export default OrderController;