const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ 
    _id: mongoose.Types.ObjectId,
    email: String,
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    admin: Boolean,
    premium: Boolean
})

module.exports = mongoose.model('User', userSchema);