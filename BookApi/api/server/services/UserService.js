import db from '../src/models';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {

    static async register({name, email, contact_number, password}) {
        try {
            return await db.User.create({
                name,
                email,
                contact_number,
                password: bcrypt.hashSync(password, 8),
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
            if (!user) {
                return {
                    loggedIn: false,
                    accessToken: null,
                    message: "Invalid password",
                };
            }
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
            });

            return {
                loggedIn: true,
                id: user.id,
                email: user.email,
                accessToken: token,
            };

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

    static async update(id, {name, contact_number,email}) {
        try {
            const user = await db.User.findOne({where: {id: Number(id)}});
            if (user) return await user.update({name, contact_number, email})
        } catch (e) {
            throw e;
        }
    }

    static async change_password(id, {params}) {
        try {
            const user = await db.User.findOne({
                where: {id: Number(id)}
            });
            console.log(params)
            const checkCurrentPassword = bcrypt.compareSync(params.currentPassword, user.password);
            if (!checkCurrentPassword) {
                return {
                    transaction: false,
                    message: "The current password is incorrect.",
                };
            }

            const $result = await db.User.update({
                password: bcrypt.hashSync(params.newPassword, 8)
            },{
                where: {id: Number(id)}
            });

            console.log("result: ", $result);
            return {
                transaction: true,
                data: $result
            };
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