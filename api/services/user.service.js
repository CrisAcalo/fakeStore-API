const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { sequelize } = require('../libs/sequelize');

class UserService {

  constructor() {
    this.model = sequelize.models.User;
  }

  async generate() {
  }

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10);
    const newUser = await this.model.create({
      ...body,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await this.model.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findByEmail(email) {
    const user = await this.model.findOne({
      where: { email }
    });
    if (!user) {
      throw boom.notFound();
    } else {
      return user;
    }
  }

  async findOne(id) {
    const user = await this.model.findByPk(id, {
      include: ['customer']
    });
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
