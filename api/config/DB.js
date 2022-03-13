require('dotenv').config();

module.exports = {
  //MYSQL Database configuration
  modelsDir: {
    path: __dirname + '/../models',
  },
  "db": {
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "dialect": "mysql",
    "port": "3306"
  },
  "production": {
    "username": "root",
    "password": "",
    "database": "dbo_vizzve",
    "host": "localhost",
    "dialect": "mysql",
    "port": "3306"
  }
};
