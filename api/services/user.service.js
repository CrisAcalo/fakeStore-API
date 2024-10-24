const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize');

class UserService {

  constructor() {
    this.model = sequelize.models.User;
  }

  async generate() {
  }

  async create(body) {
    const newUser = await this.model.create(body);
    return newUser;
  }

  async find() {
    const rta = await this.model.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await this.model.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      return user;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      const rta = await user.update(changes);
      return rta;
    }
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      await user.destroy();
      return {
        id,
        message: 'User deleted',
      }
    }
  }
}

module.exports = UserService;
