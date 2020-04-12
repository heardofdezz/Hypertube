//Session token handler 
const jwt = require('jsonwebtoken')
const config = require('../config/Config')
// User model
const mongoose = require('mongoose')
const User = require('../models/User');

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    console.log('user :', user);
    return jwt.sign(user, config.authentification.jwtSecret, {
        expiresIn: ONE_WEEK
    })  
}

module.exports = {
    async register(req, res, next) {
        try {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                admin: false,
                premium: false,
            })
            console.log(user, 'User New Mongose')
            const userJson = user.toJSON()
            console.log(userJson, 'User To Json') 
            res.send({

            })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error : 'This email is already being used'
            })
        }
    } 
}