require("dotenv").config();
const { app } = require("./app");
require("./models/index.js");
const { sequelize } = require("./config/sequelize.config");

async function Server() {
  await sequelize.sync();

  app.listen(process.env.PORT, () => {
    console.log("Server listening at port : ", process.env.PORT);
  });
}

Server();
