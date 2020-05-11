const passport = require('passport')
const { reqStaffAuth } = require('../../middlewares/reqAuth')

module.exports = (app) => {
  const auth = app.services.requireService('staffAuth')
  // login
  app.post('/api/staff/login', passport.authenticate('staff-local'), (req, res, next) => {
    res.send(req.user.staff)
  })

  // logout
  app.get('/api/staff/logout', (req, res, next) => {
    req.logout()
    res.send(req.user)
  })

  // get staff info
  app.get('/api/staff/details', reqStaffAuth, (req, res, next) => {
    res.send(req.user)
  })

  // register
  app.post('/api/staff/register', async (req, res, next) => {
    const params = { ...req.user, ...req.body }
    try {
      const result = await auth.createStaff(params)
      res.send(result)
    } catch(e) {
      res.send(e)
    }
  })

  // update password
  app.post('/api/staff/update-password', reqStaffAuth, async (req, res, next) => {
    const params = { ...req.body, ...req.user }
    try {
      const result = await auth.updatePassword(params)
      res.send(result)
    } catch(e) {
      res.send(e)
    }
  })
}
