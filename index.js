const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const path = require('path')
const { cookieKey } = require('./config/keys')
const services = require('./services')
require('dotenv').config()
require('./services/passport')
require('./models')

const app = express()
app['services'] = services

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'html')))

app.use(
  cookieSession({
    maxAge: 7*24*60*60*1000, // 7 days
    keys: [cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

// staff routes
require('./routes/staff/auth')(app)
require('./routes/staff/category')(app)
require('./routes/staff/menu')(app)
require('./routes/staff/menu-order')(app)
require('./routes/staff/room-service')(app)
require('./routes/staff/reservation')(app)
require('./routes/staff/guest')(app)
// guest routes
require('./routes/guest/auth')(app)
require('./routes/guest/menu-order')(app)
require('./routes/guest/room-service')(app)
require('./routes/guest/menu')(app)
require('./routes/guest/task')(app)
// image routes
require('./routes/image')(app)
// ping routes
require('./routes/ping')(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
