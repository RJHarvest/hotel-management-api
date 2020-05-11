const passport = require('passport')
const { reqGuestAuth } =  require('../../middlewares/reqAuth')

module.exports = (app) => {
  // login
  app.post('/api/guest/login', passport.authenticate('guest-local'), (req, res, next) => {
    res.send(req.user.guest)
  })

  // logout
  app.get('/api/guest/logout', (req, res, next) => {
    req.logout()
    res.send(req.user)
  })

  // get guest details
  app.get('/api/guest/details', reqGuestAuth, (req, res, next) => {
    res.send(req.user)
  })
}
