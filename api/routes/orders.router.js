const express = require('express');

const OrderService = require('../services/order.service');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');

const router = express.Router();

const orderService = new OrderService();

router.get('/', async (req, res) => {
  const orders = await orderService.findAll();
  res.json(orders);
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const order = await orderService.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newOrder = await orderService.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newItem = await orderService.addItem(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const order = await orderService.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      await orderService.delete(id);
      res.json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
