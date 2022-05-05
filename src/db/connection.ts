import { Sequelize } from 'sequelize-typescript'

const env = process.env.NODE_ENV || 'development';
const config = require('../api/config/config.js')[env];

const db = new Sequelize({
  ...config,
  models: [__dirname + '/models'] // or [Player, Team],
})
  export default db;