const express = require('express');

const CategoriesService = require('../services/category.service');
const {
  // createCategorySchema,
  updateCategorySchema,
  getCategorySchema } = require('../schemas/category.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'), //primero enviamos el middleware de validacion
  async (req, res, next) => { //luego el middleware de response
    const { id } = req.params;
    try {
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id/products',
  validatorHandler(getCategorySchema, 'params'), //primero enviamos el middleware de validacion
  async (req, res, next) => { //luego el middleware de response
    const { id } = req.params;
    try {
      const products = await service.findProducts(id);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// router.post('/',
//   validatorHandler(createCategorySchema, 'body'),
//   async (req, res) => {
//     const body = req.body;
//     const newCategory = await service.create(body);

//     res.status(201).json({
//       message: 'created',
//       data: newCategory,
//     });
//   });

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const { id } = req.params;
    try {
      const category = await service.update(id, body);

      res.status(200).json({
        message: 'updated',
        data: category
      });
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);

      res.json({ rta });
    } catch (error) {
      next(error);
    }

  });

module.exports = router;
