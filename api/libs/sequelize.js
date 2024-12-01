// libs/sequelize.js
const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const { setupModels } = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const DB_NAME = encodeURIComponent(config.dbName);
const PORT = encodeURIComponent(config.dbPort);

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;
// const URI = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  // dialect: 'mysql',
  logging: false, // sirve para que no muestre los logs de las consultas
});

setupModels(sequelize);

// sequelize.sync(); // sirve para que se sincronice con la base de datos

module.exports = { sequelize };
