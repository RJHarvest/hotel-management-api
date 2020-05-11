const Sequelize = require('sequelize')
const { database, host, user, password } = require('../config/keys')

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  port: 3306,
  pool: {
    maxConnections: 5,
    minConnections: 0,
    maxIdleTime: 10000
  }
})

module.exports = sequelize
