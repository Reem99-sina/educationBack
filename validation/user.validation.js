const Joi = require("joi");

module.exports.signupvalidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required().pattern(new RegExp(/[a-z]{1,5}$/)),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^[a-z0-9]{3,8}$/)),
        role: Joi.string()
    })
}
module.exports.signinvalidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^[a-z0-9]{3,8}$/)),

    })
}