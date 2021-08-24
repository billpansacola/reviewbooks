import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let books;

export default class BooksDAO {
    static async injectDB(conn) {
        if (books) { return; }
        try {
            books = await conn.db(process.env.BOOK_NS).collection("book");
        } catch (e) {
            console.error("Unable to establish connection handles in booksDAO: " + e);
        }
    }

    static async addBook(bookId, cat, nam, descr, loc) {
        try {
            const bookDoc = {
                book_id: bookId,
                category: cat,
                name: nam,
                description: descr,
                locations: loc,
            };

            return await books.insertOne(bookDoc);
        } catch(e) {
            console.error("unable to post book: " + e);
            return { error: e };
        }
    }

    static async updateBook(bookId, name, description, loc) {
        try {
            const updateResponse = await books.updateOne(
                {book_id: bookId},
                {$set: {book_id: bookId, name: name, description: description, locations: loc}}
            );
        } catch (e) {
            console.error("unable to update book: " + e);
            return { error: e };
        }
    }

    static async deleteBook(bookId) {
        try {
            const deleteResponse = await books.deleteOne({
                book_id: bookId
            });

            return deleteResponse;
        } catch (e) {
            console.error("Unable to delete book: " + e);
            return { error: e };
        }
    }
}