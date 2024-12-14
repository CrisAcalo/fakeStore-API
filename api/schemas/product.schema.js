//file schemas/product.schema.js

//json de ejemplo
// {
//     "name": "Producto 1",
//     "categoryId": 1,
//     "price": 100,
//     "description": "Descripcion del producto",
//     "image": "http://placeimg.com/640/480"
// }

const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const categoryId = Joi.number().integer().min(1).max(5);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10).max(200);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  categoryId: categoryId.required(),
  price: price.required(),
  description: description.required(),
  image: image.required()
})

const updateProductSchema = Joi.object({
  name: name,
  categoryId: categoryId,
  price: price,
  description: description,
  image: image
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
