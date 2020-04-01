// Schema validator  checking data types and regex :)
const Joi = require('joi')

module.exports = {
    register (req, res, next){
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            )
        }
        const{error, value } = Joi.validate(req.body, schema)
        if(error){
            switch (key) {
                case value:
                    
                    break;
            
                default:
                    break;
            }
        }
    }
}