const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize');

class CustomerService {
  constructor() {
    this.Customer = sequelize.models.Customer;
  }

  async find() {
    return this.Customer.findAll({
      include: ['user']
    });
  }

  async findOne(id) {
    const customer = await this.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(body) {
    return this.Customer.create(body,
      {
        include: ['user']
      }
    );
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    return customer.update(changes);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
