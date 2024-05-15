const Joi = require("joi");

module.exports.signupvalidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required().messages({'string.base': "userName must be letter",
        'string.empty': 'userName is required.tooo',
        'any.required': 'userName is required.ttotototo'}),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({'string.pattern.base': "password must had to one  uppercase,one lowercase and one special character",
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.'}),
        role: Joi.string()
    })
}
module.exports.signinvalidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({'string.pattern.base': "password must had to one  uppercase,one lowercase and one special character",
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.'}),
        active:Joi.boolean()
    })
}