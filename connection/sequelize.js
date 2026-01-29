const {Sequelize} = require('sequelize');
const {config} = require('../config');

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
      dialect: config.db.dialect,
      host: config.db.host,
    },
);

module.exports = {sequelize};
