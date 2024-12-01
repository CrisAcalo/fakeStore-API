//file schemas/product.schema.js
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
})

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  role: role
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
