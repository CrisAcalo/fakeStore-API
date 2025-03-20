const express = require('express');

const customerService = require('../services/customer.service');

const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
} = require('../schemas/customer.schema');

const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');

const router = express.Router();
const service = new customerService();

router.get('/',
  async (req, res) => {
    const customers = await service.find();
    res.json(customers);
  }
);

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newCustomer = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newCustomer
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const customer = await service.update(id, changes);
      res.status(200).json({
        message: 'updated',
        data: customer
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
