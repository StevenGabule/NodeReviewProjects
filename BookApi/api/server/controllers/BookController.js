import BookService from "../services/BookService";
import Util from "../utils/Utils";
import jimp from 'jimp';
import multer from 'multer';
import jwt from "jsonwebtoken";

const util = new Util();
const imageUploadOptions = {
    storage: multer.memoryStorage(),
    limits: {
        // storing images files up to 1mb
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, next) => {
        if (file.mimetype.startsWith("image/")) {
            next(null, true);
        } else {
            next(null, false);
        }
    }
};

exports.uploadImage = multer(imageUploadOptions).single("avatar");

exports.resizeImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const extension = req.file.mimetype.split("/")[1];
    req.body.avatar = `/static/uploads/${Date.now()}.${extension}`;
    const avatar = await jimp.read(req.file.buffer);
    await avatar.resize(750, jimp.AUTO);
    await avatar.write(`./${req.body.avatar}`);
    next();
};

class BookController {
    static async index(req, res) {
        try {
            const books = await BookService.index();
            if (books.length > 0) {
                util.setSuccess(200, "Book are available and hot", books);
            } else {
                util.setSuccess(200, "No available books today.", [])
            }
            return util.send(res);
        }catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async store(req, res) {
        console.log("body: ", req.body)
        if (!req.body.title ||!req.body.price ||!req.body.description ||!req.body.supplier_price) {
            util.setError(400, "Please provide or fill up all the details to complete your transaction.");
            return util.send(res);
        }
        const book = req.body;
        try {
            const {id} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            const createBook = await BookService.store(book, id);
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

        if (!("authorization" in req.headers)) {
            util.setError(401, "No authorization token");
            return util.send(res);
        }
        const {id: userId} = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, "Please input a number value!");
            return util.send(res);
        }
        try {
            const result = await BookService.destroy(id,userId);
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