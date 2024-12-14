const { sequelize } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {

  constructor() {
    this.Category = sequelize.models.Category;
  }

  async find() {
    return this.Category.findAll();
  }

  async findOne(id) {
    const category = await this.Category.findByPk(id,
      {
        include: ['products']
      }
    );
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async create(body) {
    return this.Category.create(body);
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    return category.update(changes);
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;
