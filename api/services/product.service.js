const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductService {

  constructor() {
    this.Product = sequelize.models.Product;
  }

  async create(body) {
    return this.Product.create(body);
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }

    return this.Product.findAll(options);
  }

  async findOne(id) {
    const product = await this.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    return product.update(changes);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}


module.exports = new ProductService(); // para que exista una sola instancia
