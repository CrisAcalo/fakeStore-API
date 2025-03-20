'use strict';

/** @type {import('sequelize-cli').Migration} */
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
