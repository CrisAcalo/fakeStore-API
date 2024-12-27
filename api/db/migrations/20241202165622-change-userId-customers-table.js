'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      field: 'user_id',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      field: 'user_id',
    });
  }
};
