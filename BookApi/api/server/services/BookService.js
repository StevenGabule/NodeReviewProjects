import database from '../src/models';

class BookService {
    static async index() {
        try {
            return await database.Book.findAll();
        } catch (e) {
            throw e;
        }
    }

    static async store($request) {
        console.log($request)
        try {
            return await database.Book.create({
                title: $request.title,
                price: $request.price,
                description: $request.description,
                avatar: "http://localhost:8000" + $request.avatar,
            })
        } catch (e) {
            throw e;
        }
    }

    static async update(id, $request) {
        try {
            const result = await database.Book.findOne({
                where: {id: Number(id)}
            })
            if (result) {
                 await database.Book.update($request, {where: {id: Number(id)}})
                return $request;
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

    static async destroy(id) {
        try {
            const result = await database.Book.findOne({
                where: { id: Number(id)}
            });
            if (result) {
                return await database.Book.destroy({
                    where: { id: Number(id)}
                });
            }
            return null;
        } catch (e) {
            throw e;
        }
    }
}

export default BookService;