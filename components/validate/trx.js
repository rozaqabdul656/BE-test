const Joi = require('joi');
const RequestValidatorUtility = require('./RequestValidatorUtility');
const ValidateLogin = new RequestValidatorUtility(
    Joi.object({
        trx_id: Joi.string().required(),
        amount: Joi.float().required(),
        user_id: Joi.number().required(),
    })
        .unknown()
    );

    module.exports = {
        ValidateLogin
    };