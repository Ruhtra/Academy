const Joi = require("joi");
const validator = (scheme) => (payload) => 
    scheme.validate(payload, { abortEarly: false })

    
const idScheme = Joi.string().hex().length(24)
const horaScheme = Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)

module.exports = {
    gym: {
        post: validator(Joi.object().keys({
            musculos: Joi.array().items(idScheme).required(),
            inicio: horaScheme.required(),
            fim: horaScheme.required(),
            exercicios: Joi.array().items(Joi.object().keys({
                nome: Joi.string().min(10).max(50).required(),
                series : Joi.array().items(Joi.object().keys({
                    reps: Joi.number().integer().min(0).required(),
                    peso: Joi.number().min(0).required(),
                    falha: Joi.bool().required(),
                    esforco: Joi.number().integer().min(1).max(10).required(),
                    anotacao: Joi.string().max(1000)
                })).required().min(1)
            })).required().min(1)
        }).custom((value, helpers) => {
            const horaInicio = new Date(`2000-01-01T${value.inicio}`);
            const horaFim = new Date(`2000-01-01T${value.fim}`);

            if (horaInicio >= horaFim) {
                return helpers.message('"inicio" deve ser menor que "fim"');
            }

            return value;
        }))
    },
    id: validator(idScheme.required()),
    auth: {
        login: validator(Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().min(5).max(64).required()
        }))
    }
}