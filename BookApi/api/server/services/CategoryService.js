import db from '../src/models';
import bcrypt from "bcryptjs";

class CategoryService {

    static async index() {
        try {
            return await db.Category.findAll();
        } catch (e) {
            throw e;
        }
    }

    static async store(payload) {
        try {
            return await db.Category.create(payload)
        } catch (e) {
            throw e;
        }
    }

    static async update(id, name) {
        try {
            const result = await db.Category.findOne({
                where: {id: Number(id)}
            });

            if (result) {
                return await result.update({name})
            }
            return false;
        } catch (e) {
            throw e;
        }
    }

    static async destroy(id) {
        try {
            return await db.Category.destroy({
                where: {id}
            });
        } catch (e) {
            throw e;
        }
    }
}

export default CategoryService;