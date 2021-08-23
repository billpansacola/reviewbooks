let reviewbooks;

export default class ReviewbooksDAO {
    static async injectDB(conn) {
        if (reviewbooks) {
            return;
        }
        try {
            reviewbooks = await conn.db(process.env.BOOK_NS).collection("book");
        } catch  (e) {
            console.error('Unable to establish a connection handle in ReviewbooksDAO: ' + e);
        }
    }

    static async getBooks({ filters = null, page = 0, booksPerPage = 20} = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                query = {$text: { $search: filters["name"]}};
            }
        }

        let cursor;

        try {
            cursor = await reviewbooks.find(query);
        } catch (e) {
            console.error('UNable to issue find command, ' + e);
            return { reviewbooksList: [], totalNumBooks: 0};
        }

        const displayCursor = cursor.limit(booksPerPage).skip(booksPerPage * page);

        try {
            const reviewbooksList = await displayCursor.toArray();
            const totalNumBooks = await reviewbooks.countDocuments(query);

            return { reviewbooksList, totalNumBooks }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            );
            return { reviewbooksList: [], totalNumBooks: 0};
        }
    }
}