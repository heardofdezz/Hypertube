// Mongoose handler 
const mongoose = require('mongoose')
// Password hashing 
const bcrypt = require('bcrypt')
const saltRounds = 10


mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({ 
    _id: mongoose.Types.ObjectId,
    email: { type: String, index: true, unique: true },
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    admin: Boolean,
    premium: Boolean,
});
// Hashing password before saving into database
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
})
module.exports = mongoose.model('User', userSchema);