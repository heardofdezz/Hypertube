//Session token handler 
const jwt = require('jsonwebtoken')
const config = require('../config/Config')
//Password Hashing bcrypt
const bcrypt = require('bcrypt')
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
            const user = await User.create({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                admin: null,
                premium: null,
            })
            // user.save()
            userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
           
        } catch(user) {
            console.log(err)
            res.status(400).send({
                error : 'This email is already being used'
            })
        }
    },
    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            console.log(user)
            if(!user){
                res.status(403).send({
                    error: 'Wrong login information'
                })
            }
            if(bcrypt.compareSync(req.body.password, userInfo)){
              const userJson = user.toJSON()
              res.send({
                  user: userJson,
                  token: jwtSignUser(userJson)
              })
            } else {
                return res.status(403).send({
                    error: 'Wrong login information 2'
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured tying to login'
            })
        }
    }
}


