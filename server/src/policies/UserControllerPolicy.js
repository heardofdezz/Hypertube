// Schema validator  checking data types and regex :)
const Joi = require('joi')

module.exports = {
    async register (req, res, next){
        console.log(req.body)
        const schema = Joi.object().keys({
            email: Joi.types.String().email().required(),
            username: Joi.String().required(),
            lastname: Joi.String(),
            firstname: Joi.String(),
            password: Joi.String().required().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            )
        })
        const{error, value } = await Joi.validate(req.body, schema)
        if(error){
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error:"Email isn't valid"
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password failed to match the follwoing rules: <br>
                        1. Must contain ONLY the following characters: lower case, upper case, numerics. <br>
                        2. Its must be between 6 to 32 characters `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid Sign Up Information.'
                    })
            }
        }else
        next()
    },
    login (req, res, next){
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            )
        }
        const{error, value} = Joi.validate(req.body, schema)
        if(error){
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Email isnt valid'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The Password failed to match the following rules:
                        <br>
                        1. Must contain ONLY the following characters: lower case, upper case, numerics.
                        <br>
                        2. It must be between 6 to 32 characters `
                    })
                default:
                    res.status(400).send({
                        error: 'Invalid information'
                    })
            }
        }
    }
}