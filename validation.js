const Joi = require('joi');

const registrationRequestValidation = (requestBody) => {
  const schema = Joi.object({
    username: Joi.string().max(10).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(requestBody);
};

const loginRequestValidation = (requestBody) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(requestBody);
};

module.exports = { registrationRequestValidation, loginRequestValidation };
