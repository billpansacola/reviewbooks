let user;

export default class UserDAO {
    static async injectDB(conn) {
        if (user) {
            return;
        }
        try {
            user = await conn.db(process.env.BOOK_NS).collection("users");
        } catch (e) {
            console.error('Unable to esatablish a connection handle in UserDAO: ' + e);
        }
    }

    static async getUsers({ filters = null, page = 0, usersPerPage = 20 } = {}) {
        let query;
        let cursor;

        try {
            cursor = await user.find(query);
        } catch (e) {
            console.error('Unable to issue command: ' + e);
            return { usersLIst: [], totalNumUsers: 0 };
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page);

        try {
            const usersList = await displayCursor.toArray();
            const totalNumUsers = await user.countDocuments(query);

            return { usersList, totalNumUsers };
        } catch (e) {
            console.error( 'Unable to convert cursor to array or problem counting documents: ' + e);
            return { usersList: [], totalNumUsers: 0 };
        }
    }
}