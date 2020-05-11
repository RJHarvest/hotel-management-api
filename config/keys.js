require('dotenv').config()

module.exports = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  cookieKey: process.env.COOKIE_KEY,
}
