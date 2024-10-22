const boom = require('@hapi/boom');

const { getConnection } = require('../libs/postgres');

class UserService {

  constructor() {
  }

  async generate() {
  }

  async create(body) {
  }

  async find() {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM tasks');
    return result.rows;
  }

  async findOne(id) {
  }

  async update(id, changes) {
  }

  async delete(id) {
  }
}

module.exports = UserService;
