// schemas/customer.schema.js
// id, name, lastname, phone, adress, createdAt

const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string().min(3).max(30);
const phone = Joi.string().max(15);
const adress = Joi.string().max(150);

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.required(),
    adress: adress.required(),
    })

const updateCustomerSchema = Joi.object({
    name: name,
    lastname: lastname,
    phone: phone,
    adress: adress,
})

const getCustomerSchema = Joi.object({
    id: id.required()
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }