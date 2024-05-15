const Joi = require("joi");

module.exports.examsValidationAdd = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        description: Joi.string(),
        questions:Joi.array().items(Joi.object().keys({question:Joi.string(),answer:Joi.string()}))
    })
}