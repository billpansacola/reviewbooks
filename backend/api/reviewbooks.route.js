import express from "express"
import ReviewbooksCtrl from "./reviewbooks.controller.js"
import BookCtrl from "./book.controller.js"

const router = express.Router();
// router.route("/").get((req,res) => res.send("hello"));
router.route("/").get(ReviewbooksCtrl.apiGetBooks);

router
    .route("/book")
    .post(BookCtrl.apiPostBook);
    // .put(BookCtrl.apiUpdateBook)
    // .delete(BookCtrl.apiDeleteReview);

export default router