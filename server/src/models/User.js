const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ 
    _id: mongoose.Types.ObjectId,
    email: {String, unique: true, required: true},
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    admin: Boolean,
    premium: Boolean,
    token: String
})

module.exports = mongoose.model('User', userSchema);