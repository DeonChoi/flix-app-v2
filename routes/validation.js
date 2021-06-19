const Joi = require('@hapi/joi');

const googleRegisterValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(1)
            .required(),
        lastName: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(1)
            .max(255)
            .email()
            .required()
    });

    return schema.validate(data);
};

const googleLoginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(1)
            .max(255)
            .email()
            .required()
    });

    return schema.validate(data);
};

module.exports.googleRegisterValidation = googleRegisterValidation;
module.exports.googleLoginValidation = googleLoginValidation;