const Joi = require('joi');
const RequestValidatorUtility = require('./RequestValidatorUtility');
const ValidateLogin = new RequestValidatorUtility(
    Joi.object({
        email: Joi.string().email(),
        password: Joi.string().required(),
    })
        .unknown()
    );

    module.exports = {
        ValidateLogin
    };