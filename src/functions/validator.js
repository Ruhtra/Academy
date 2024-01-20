const Joi = require("joi");
const validator = (scheme) => (payload) => 
    scheme.validate(payload, { abortEarly: false })

    
const idScheme = Joi.string().hex().length(24)

module.exports = {
    id: validator(idScheme.required()),
    auth: {
        login: validator(Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required()
        }))
    }
}