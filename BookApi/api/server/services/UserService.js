import db from '../src/models';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {

    static async register(user) {
        try {
            return await db.User.create({
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                avatar: "no-user.jpg",
                user_type: user.user_type,
                contact_number: user.contact_number,
                password: bcrypt.hashSync(user.password, 8),
            });
        } catch (e) {
            throw e;
            console.log(e)
        }
    }

    static async login({email, password}) {
        try {
            const user = await db.User.findOne({
                where: {email}
            });
            const pw = bcrypt.compareSync(password, user.password);
            if (!pw) {
                return {
                    loggedIn: false,
                    accessToken: null,
                    message: "Invalid password",
                };
            }
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
                expiresIn: 86400
            })
            return {
                loggedIn: true,
                id: user.id,
                email: user.email,
                accessToken: token,
            }
        } catch (e) {
            throw e;
        }
    }

    static async logout($request) {
       return null;
    }

    static async index() {
        try {
            return await db.User.findAll();
        } catch (e) {
            throw e;
        }
    }

    static async store($request) {
        try {
            return await db.User.create($request)
        } catch (e) {
            throw e;
        }
    }

    static async update(id, $request) {
        try {
            const result = await db.User.findOne({
                where: {id: Number(id)}
            })
            if (result) {
                await db.User.update($request, {where: {id: Number(id)}})
                return $request;
            }
        } catch (e) {
            throw e;
        }
    }

    static async profile(id) {
        try {
            return await db.User.findOne({
                where: { id: Number(id)}
            })
        }catch (e) {
            throw e;
        }
    }

    static async destroy(id) {
        try {
            const result = await db.User.findOne({
                where: { id: Number(id)}
            });
            if (result) {
                return await db.User.destroy({
                    where: { id: Number(id)}
                });
            }
            return null;
        } catch (e) {
            throw e;
        }
    }
}

export default UserService;