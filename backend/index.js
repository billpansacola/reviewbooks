import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ReviewbooksDAO from './dao/reviewbooksDAO.js'
import BooksDAO from './dao/booksDAO.js'
// import YelpDAO from "./dao/yelpDAO.js"
import UserDAO from "./dao/userDAO.js"

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.REVIEWBOOKS_DB_URI
)
.catch(err => {
    console.error(err.stack);
    process.exit(1)
})
.then(async client => {
    await ReviewbooksDAO.injectDB(client);
    await BooksDAO.injectDB(client);
    await UserDAO.injectDB(client);
    app.listen(port, () => {
        console.log('listening on port ' + port)
    })
})
