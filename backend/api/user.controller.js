import UserDAO from "../dao/userDAO.js";

export default class UserCtrl {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
    
        let filters = {}
         if (req.query.name) {
          filters.name = req.query.name
        }
    
        const { usersList, totalNumUsers } = await UserDAO.getUsers({
          filters,
          page,
          usersPerPage,
        })
    
        let response = {
          users: usersList,
          page: page,
          filters: filters,
          entries_per_page: usersPerPage,
          total_results: totalNumUsers,
        }
        res.json(response)
    }
}