const boom = require('@hapi/boom');

const { pool } = require('../libs/postgres.pool');

class UserService {

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err)=>{console.log(err)})
  }

  async generate() {
  }

  async create(body) {
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const result = await this.pool.query(query);
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
