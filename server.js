require("dotenv").config();
const { app } = require("./app");
const { config } = require("./config/index.js");
const { sequelize } = require("./connection/sequelize.js");
require("./models/index.js");

async function Server() {
  await sequelize.sync();

  app.listen(config.port, () => {
    console.log("Server listening at port : ", config.port);
  });
}

Server();
