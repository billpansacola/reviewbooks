import BooksDAO from "../dao/booksDAO.js"

export default class BookCtrl {
    static async apiPostBook(req, res, next) {
        try {
            const bookId = req.body.book_id;
            const category = req.body.category;
            const name = req.body.name;
            const description = req.body.description;
            const locations = req.body.locations;

            const BookResponse = await BooksDAO.addBook(
                bookId,
                category,
                name,
                description,
                locations,
            );
            res.json({status:"success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateBook(req, res, next) {
        try {
            const bookId = req.body.book_id;
            const name = req.body.name;
            const description = req.body.description;
            const locations = req.body.locations;

            const BookResponse = await BooksDAO.updateBook(
                bookId,
                name,
                description,
                locations,
            );
            res.json({status:"success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const bookId = req.body.book_id;

            const ReviewResponse = await BooksDAO.deleteBook(
                bookId,
            );
            res.json({status: "success"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}