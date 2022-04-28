
class RequestValidatorUtility {
    /**
     * @param {Joi.Schema} schema joi schema for the payload
     */
    constructor(schema) {
      this.schema = schema;
    }
    
    validateBody(body) {
      const {error} = this.schema.validate(body, { abortEarly: false });
      if (error) {
        throw {
          'status': 400,
          'message': "Invalid Request !!",
          'error': 'ER_VALIDATION_FAILED',
        };
      }
    }
  }
  
  module.exports = RequestValidatorUtility;
  