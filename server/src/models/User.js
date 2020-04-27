/*// Mongoose handler
const mongoose = require('mongoose')
// Password hashing
const bcrypt = require('bcrypt')
//const saltRounds = 10*/
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


mongoose.set('useCreateIndex', true);


const userSchema = new mongoose.Schema({
    /*_id: mongoose.Types.ObjectId,*/
    email: { type: String, index: true, unique: true , validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid_email');
            }
        }},
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    admin: Boolean,
    premium: Boolean,
    verify_token: String,
    verify: Boolean,
    created: { type: Date, default: Date.now },
    tokens: [{
        token: {
            type: String
        }
    }],
    codeEmail: String,
    codePassword: String,
    views: []
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'AL2a1954916358532', {expiresIn: '14d'});

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('identification_fail');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('identification_fail');
    }

    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

/*userSchema.set('validateBeforeSave', false);

// Hashing password before saving into database
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});*/



module.exports = mongoose.model('User', userSchema);
