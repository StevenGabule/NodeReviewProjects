import database from '../src/models';
import jwt from "jsonwebtoken";

class BookService {
    static async index() {
        try {
            return await database.Book.findAll();
        } catch (e) {
            throw e;
        }
    }

    static async store({title, price, supplier_price, description, avatar, status}, userId) {
        try {
            return await database.Book.create({
                userId,
                title,
                price,
                supplierPrice: supplier_price,
                description,
                avatar: "http://localhost:8000" + avatar,
                status,
            })
        } catch (e) {
            throw e;
        }
    }

    static async update(id, {title, price, supplier_price, description, avatar, status}) {
        try {
            const result = await database.Book.findOne({
                where: {
                    id: Number(id)
                }
            })
            if (result) {
                return await result.update({
                    title,
                    price,
                    supplierPrice: supplier_price,
                    description,
                    avatar: "http://localhost:8000" + avatar,
                    status,
                })
            }
        } catch (e) {
            throw e;
        }
    }

    static async show(id) {
        try {
            return await database.Book.findOne({
                where: { id: Number(id)}
            })
        }catch (e) {
            throw e;
        }
    }

    static async destroy(id,userId) {
        try {
            const result = await database.Book.findOne({
                where: {
                    id: Number(id),
                    userId
                }
            });
            if (result) {
                return await result.destroy();
            }
            return null;
        } catch (e) {
            throw e;
        }
    }
}

export default BookService;