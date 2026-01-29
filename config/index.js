const config = {
  port: process.env.PORT || 3000,

  db: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: 'localhost',
    dialect: 'mysql',
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h',
  },
  cors: {
    origin: process.env.ORIGIN_URL,
  },
};

module.exports = {config};
