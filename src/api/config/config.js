const fs = require('fs');
const {CI_DB_USERNAME,CI_DB_PASSWORD, CI_DB_NAME, PROD_DB_USERNAME,PROD_DB_PASSWORD,PROD_DB_NAME,PROD_DB_HOSTNAME,PROD_DB_PORT } = process.env;
module.exports = {
  development: {
    username: 'root',
    password: 'dontopen',
    database: 'finance',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: CI_DB_USERNAME,
    password: CI_DB_PASSWORD,
    database: CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }, 
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOSTNAME,
    port: PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        // ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      }
    }
  }
};