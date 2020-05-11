const { reqGuestAuth } = require('../../middlewares/reqAuth')

module.exports = (app) => {
  const roomServices = app.services.requireService('roomServices')

  // get all orders of guest
  app.get('/api/guest/room-services', reqGuestAuth, async (req, res, next) => {
    const params = {
      room_id: req.user.guest && req.user.guest.room_id,
    }
    try {
      const response = await roomServices.getItems(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // create room service
  app.post('/api/guest/room-services', reqGuestAuth, async (req, res, next) => {
    const params = {
      room_id: req.user.guest && req.user.guest.room_id,
      task_id: req.body.task_id,
      remarks: req.body.remarks,
    }
    try {
      const response = await roomServices.createItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}
