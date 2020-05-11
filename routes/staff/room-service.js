const { reqStaffAuth } = require('../../middlewares/reqAuth')
const { reqRoomServicePermission } = require('../../middlewares/reqPermission')
const reqAuthPerm = [reqStaffAuth, reqRoomServicePermission]

module.exports = (app) => {
  const roomServices = app.services.requireService('roomServices')
  // get all room service tasks
  app.get('/api/staff/room-services', reqAuthPerm, async (req, res, next) => {
    try {
      const response = await roomServices.getItems()
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // update room service task status
  app.put('/api/staff/room-services/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
      status: req.body.status,
    }
    try {
      const response = await roomServices.updateItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}
