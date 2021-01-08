import UserService from "../services/UserService";
import Util from "../utils/Utils";
import jwt from "jsonwebtoken";

const util = new Util();

class UserController {

    static async register(req, res) {
        console.log(req.body)
        if (!req.body.name ||
            !req.body.email ||
            !req.body.contact_number ||
            !req.body.password) {
            util.setError(400, "Please provide or fill up all the details.");
            return util.send(res);
        }

        const user = req.body;

        try {
            const newUser = await UserService.register(user);
            util.setSuccess(201, "Registered", newUser);
            return util.send(res);
        } catch (e) {
            util.setError(400, e.message);
            return util.send(res);
        }
    }


    static async login(req, res) {
        // console.log(req.body)
        if (!req.body.email || !req.body.password) {
            util.setError(400, "Login invalid, Check your credentials!");
            return util.send(res);
        }

        const user = req.body;
        try {
            const result = await UserService.login(user);
            console.log(result)
            if (result.loggedIn) {
                util.setSuccess(200, "User loggedIn!", result);
            } else {
                util.setError(404, `Email or password are not found.`);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res)
        }
    }

    static async logout(req, res) {
        const user = req.body;
        if (user) {
            util.setError(400, "");
            return util.send(res);
        }
    }

    static async index(req, res) {
        try {
            const users = await UserService.index();
            if (users.length > 0) {
                util.setSuccess(200, "users", users);
            } else {
                util.setSuccess(200, "No available users today.")
            }
            return util.send(res);
        }catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async store(req, res) {
        if (!req.body.title ||!req.body.price ||!req.body.description) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }
        const book = req.body;
        try {
            const createBook = await UserService.store(book);
            util.setSuccess(201, "New book information added successfully!", createBook);
            return util.send(res);
        } catch (e) {
            util.setError(400, e.message);
            return util.send(res);
        }
    }

    static async profile(req, res) {
        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }

        try {
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            console.log(id)
            const result = await UserService.profile(id);
            if (!result) {
                util.setError(404, `Account not found`);
            } else {
                util.setSuccess(200, "Found it!", result);
            }
            return util.send(res);
        } catch (e) {
            util.setError(404, e);
            return util.send(res)
        }
    }

    static async profile_update(req, res) {
        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }
        try {
            const body = req.body;
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            if (!Number(id)) {
                util.setError(400, "Please input a valid number!");
                return util.send(res);
            }
            const result = await UserService.update(id, body);
            if (!result) {
                util.setError(404, `Can't update the id of ${id}`);
            } else {
                util.setSuccess(200, "User is updated successfully!", result);
            }
            return util.send(res);
        } catch (e) {
            util.setError(404, e)
            return util.send(res)
        }
    }

    static async change_password(req, res) {
        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }

        try {
            const body = req.body;
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            if (!Number(id)) {
                util.setError(400, "Please input a valid number!");
                return util.send(res);
            }
            const result = await UserService.change_password(id, body);
            if (!result.transaction) {
                util.setError(404, `The current password is incorrect.`);
            } else {
                util.setSuccess(200, "The password is updated!", result);
            }
            return util.send(res);
        } catch (e) {
            util.setError(404, e)
            return util.send(res)
        }
    }

    static async destroy(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a number value!");
            return util.send(res);
        }

        try {
            const result = await UserService.destroy(id);
            if (result) {
                util.setSuccess(200, "User has been deleted!");
            } else {
                util.setError(404, `User with the id ${id} can't be found!`);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }
}

export default UserController;