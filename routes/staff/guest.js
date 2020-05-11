const { reqStaffAuth } = require('../../middlewares/reqAuth')
const { reqFrontDeskPermission } = require('../../middlewares/reqPermission')
const reqAuthPerm = [reqStaffAuth, reqFrontDeskPermission]

module.exports = (app) => {
  const guests = app.services.requireService('guests')

  // get guest by id
  app.get('/api/staff/guest/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
    }
    try {
      const response = await guests.getItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // create guest
  app.post('/api/staff/guest', reqAuthPerm, async (req, res, next) => {
    const params = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      passport_number: req.body.passport_number,
      phone_number: req.body.phone_number,
      email: req.body.email,
    }
    try {
      const response = await guests.createItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // update guest
  app.put('/api/staff/guest/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      passport_number: req.body.passport_number,
      phone_number: req.body.phone_number,
      email: req.body.email,
    }
    try {
      const response = await guests.updateItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}
