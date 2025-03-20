const express = require('express');

const ProductsService = require('../services/product.service');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');

const router = express.Router();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res) => {
    const products = await ProductsService.find(req.query);
    res.json(products);
  }
);
router.get('/:id',
  validatorHandler(getProductSchema, 'params'), //primero enviamos el middleware de validacion
  async (req, res, next) => { //luego el middleware de response
    const { id } = req.params;
    try {
      const product = await ProductsService.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await ProductsService.create(body);

      res.status(201).json({
        message: 'created',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }

  });
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const { id } = req.params;
    try {
      const product = await ProductsService.update(id, body);

      res.status(200).json({
        message: 'updated',
        data: product,
        id
      });
    } catch (error) {
      next(error);
    }
  });
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await ProductsService.delete(id);

      res.json({ rta });
    } catch (error) {
      next(error);
    }

  });
module.exports = router;
