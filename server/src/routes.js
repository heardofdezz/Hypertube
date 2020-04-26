const UserController = require('./controllers/UserController')
const UserControllerPolicy = require('./policies/UserControllerPolicy')
const MovieController = require('./controllers/MovieController')
module.exports = (app) => {
    app.post('/register', 
    UserControllerPolicy.register,
    UserController.register)

    app.post('/login',
    UserController.login)

    app.get('/movies', MovieController.MoviesIndex)
}
