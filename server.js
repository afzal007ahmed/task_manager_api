require("dotenv").config();
const { app } = require("./app");
const { config } = require("./config/index.js");
const { logger } = require("./config/winston.config.js");
const { sequelize } = require("./connection/sequelize.js");
require("./models/index.js");

async function Server() {
  await sequelize.sync();

  app.listen(config.port, () => {
    logger.info(`Server is listening on : ${config.port}`) ;
  });
}

Server();
