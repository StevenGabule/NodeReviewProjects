import db from '../src/models';
import bcrypt from "bcryptjs";

class CartService {

    static async index(customerId) {
        try {
            return await db.Cart.findAll({
                where: {customerId},
                include: db.Book
            });
        } catch (e) {
            throw e;
        }
    }

    static async store_cart(customerId, {bookId, qty}) {
        try {
            return await db.Cart.create({
                customerId,
                bookId,
                qty,
            })
        } catch (e) {
            throw e;
        }
    }

    static async update(id, {params}) {
        try {
            const result = await db.Cart.findOne({
                where: {id: Number(id)}
            });

            if (result) {
                const $result = await db.Cart.update({
                    firstName: params.firstName,
                    middleName: params.middleName,
                    lastName: params.lastName,
                    contact_number: params.contact_number,
                    email: params.email,
                }, {where: {id: Number(id)}})
                console.log("result: ", $result);
                return $result;
            }
        } catch (e) {
            throw e;
        }
    }

    static async change_password(id, {params}) {
        try {
            const user = await db.Cart.findOne({
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

            const $result = await db.Cart.update({
                password: bcrypt.hashSync(params.newPassword, 8)
            }, {
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
            return await db.Cart.findOne({
                where: {id: Number(id)}
            })
        } catch (e) {
            throw e;
        }
    }

    static async remove_cart(customerId, id) {
        try {
            return await db.Cart.destroy({
                where: {
                    id,
                    customerId
                }
            });
        } catch (e) {
            throw e;
        }
    }

    static async destroy(customerId) {
        try {
            return await db.Cart.destroy({
                where: {customerId}
            });
        } catch (e) {
            throw e;
        }
    }
}

export default CartService;