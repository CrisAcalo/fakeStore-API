'use strict';

const { OrderSchema, ORDER_TABLE } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear una copia del esquema sin el campo virtual
    const schemaWithoutVirtual = { ...OrderSchema };
    delete schemaWithoutVirtual.total;

    await queryInterface.createTable(ORDER_TABLE, schemaWithoutVirtual);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
