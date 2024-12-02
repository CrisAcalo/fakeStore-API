// schemas/customer.schema.js
// id, name, lastname, phone, adress, createdAt

//Json ejemplo para metodo post
// {
//     "name": "Juan",
//     "lastname": "Perez",
//     "phone": "123456789",
//     "adress": "Calle 123",
//     "user_id": 1
// }

const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string().min(3).max(30);
const phone = Joi.string().max(15);
const adress = Joi.string().max(150);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.required(),
    adress: adress.required(),
    userId: userId.required()
    })

const updateCustomerSchema = Joi.object({
    name: name,
    lastname: lastname,
    phone: phone,
    adress: adress,
    userId: userId
})

const getCustomerSchema = Joi.object({
    id: id.required()
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
