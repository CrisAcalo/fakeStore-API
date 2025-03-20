const Joi = require('joi');

const email = Joi.string().email().required();
const password = Joi.string().min(8).required();
const passwordConfirmation = Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'any.only': 'Password confirmation must match the password.',
    });
const token = Joi.string().required();

const loginSchema = Joi.object({
    email,
    password,
});

const recoverySchema = Joi.object({
    email,
});

const changePasswordSchema = Joi.object({
    token,
    password,
    passwordConfirmation,
});

module.exports = {
    loginSchema,
    recoverySchema,
    changePasswordSchema
};