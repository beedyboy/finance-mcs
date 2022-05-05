import { Sequelize } from 'sequelize-typescript'

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

export const sequelize = new Sequelize({
  database: 'finance',
  dialect: 'mysql',
  username: 'root',
  password: 'dontopen',
  storage: ':mysql:',
  models: [__dirname + '/models'] // or [Player, Team],
})