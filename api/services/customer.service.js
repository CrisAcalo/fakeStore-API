const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

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
    const hash = await bcrypt.hash(body.user.password, 10);
    const data = {
      ...body,
      user: {
        ...body.user,
        password: hash
      }
    };
    const newCustomer = await this.Customer.create(data,
      {
        include: ['user']
      }
    );
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
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
