import BookService from "../services/BookService";
import Util from "../utils/Utils";

const util = new Util();

class BookController {
    static async index(req, res) {
        try {
            const books = await BookService.index();
            if (books.length > 0) {
                util.setSuccess(200, "Book are available and hot", books);
            } else {
                util.setSuccess(200, "No available books today.")
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
            const createBook = await BookService.store(book);
            util.setSuccess(201, "New book information added successfully!", createBook);
            return util.send(res);
        } catch (e) {
            util.setError(400, e.message);
            return util.send(res);
        }
    }

    static async update(req, res) {
        const modify = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a valid number!");
            return util.send(res);
        }

        try {
            const result = await BookService.update(id, modify);
            if (!result) {
                util.setError(404, `Can't find the book with the id of ${id}`);
            } else {
                util.setSuccess(200, "Book is updated successfully!", result);
            }
            return util.send(res);
        } catch (e) {
            util.setError(404, e)
            return util.send(res)
        }
    }

    static async show(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, "Please input a number value!");
            return util.send(res);
        }
        try {
            const result = await BookService.show(id);
            if (!result) {
                util.setError(404, `Cannot find book with the id ${id}`);
            } else {
                util.setSuccess(200, "Found it!", result);
            }
            return util.send(res);
        } catch (e) {
            util.setError(404, e);
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
            const result = await BookService.destroy(id);
            if (result) {
                util.setSuccess(200, "Book has been deleted!");
            } else {
                util.setError(404, `Book with the id ${id} can't be found!`);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }
}

export default BookController;