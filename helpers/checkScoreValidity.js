const Joi = require('joi');

const scoreValidation = (requestBody) => {
    const schema = Joi.object({
       score: Joi.number().greater(0).required(),
       mode: Joi.string().default('single'),
    });

    return schema.validate(requestBody);
}

module.exports = { scoreValidation };
