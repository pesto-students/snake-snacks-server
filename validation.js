const Joi = require('joi');
const joi = require('joi');

const registrationValidation = (requestBody) => {
  const schema = Joi.object({
    username: Joi.string().max(10).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(requestBody);
};

module.exports = { registrationValidation };
