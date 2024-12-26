const Joi = require('joi');

const id = Joi.number().integer().positive();
const customerId = Joi.number().integer().positive();
const status = Joi.string().valid('Pendiente', 'Enviado', 'Entregado');

const productId = Joi.number().integer().positive();
const quantity = Joi.number().integer().positive();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  status: status.required(),
});

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: productId.required(),
  quantity: quantity.required(),
});

const updateOrderSchema = Joi.object({
  customerId,
  status,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema
};
