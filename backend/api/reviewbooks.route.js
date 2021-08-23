import express from "express"
import ReviewbooksCtrl from "./reviewbooks.controller.js"

const router = express.Router();
// router.route("/").get((req,res) => res.send("hello"));
router.route("/").get(ReviewbooksCtrl.apiGetBooks);

export default router