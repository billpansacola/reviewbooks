import ReviewbooksDAO from "../dao/reviewbooksDAO.js";

export default class ReviewbooksCtrl {
    static async apiGetBooks(req, res, next) {
        const booksPerPage = req.query.booksPerPage ? parseInt(req.query.booksPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
    
        let filters = {}
         if (req.query.name) {
          filters.name = req.query.name
        }
    
        const { reviewbooksList, totalNumBooks } = await ReviewbooksDAO.getBooks({
          filters,
          page,
          booksPerPage,
        })
    
        let response = {
          books: reviewbooksList,
          page: page,
          filters: filters,
          entries_per_page: booksPerPage,
          total_results: totalNumBooks,
        }
        res.json(response)
      }
}