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
const price = Joi.number().integer().min(1);
const description = Joi.string().min(10).max(200);
const image = Joi.string().uri();

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);
const price_min = Joi.number().integer().min(1);
const price_max = Joi.number().integer().min(1);

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

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.number().greater(Joi.ref('price_min')).required(),
  })
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
