const Joi = require("joi");

module.exports.coursesValidationAdd = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        description: Joi.string()
    })
}
module.exports.coursesValidationById = {
    params: Joi.object().required().keys({
       
        id: Joi.string().required()
    })
}