const UserController = require('./controllers/UserController')
const UserControllerPolicy = require('./policies/UserControllerPolicy')

module.exports = (app) => {
    app.post('/register', 
    UserControllerPolicy.register,
    UserController.register)

    // app.post('/login',
    // UserController.login)

}