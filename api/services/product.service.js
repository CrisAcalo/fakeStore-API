const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize');

class ProductService {

  constructor() {
    this.Product = sequelize.models.Product;
  }

  async create(body) {
    return this.Product.create(body);
  }

  async find() {
    return this.Product.findAll({
      include: ['category']
    });
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
