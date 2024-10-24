const {Sequelize} = require('sequelize');

const { config } = require('../config/config');
const {setupModels} = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const DB_NAME = encodeURIComponent(config.dbName);
const PORT = encodeURIComponent(config.dbPort);

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

sequelize.sync();

module.exports = { sequelize };
