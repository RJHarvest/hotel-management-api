const { reqGuestAuth } = require('../../middlewares/reqAuth')

module.exports = (app) => {
  const menuOrders = app.services.requireService('menuOrders')

  // get all orders of guest
  app.get('/api/guest/menu-orders', reqGuestAuth, async (req, res, next) => {
    const params = {
      room_id: req.user.guest && req.user.guest.room_id,
    }
    try {
      const response = await menuOrders.getItems(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // create menu order
  app.post('/api/guest/menu-orders', reqGuestAuth, async (req, res, next) => {
    const params = {
      room_id: req.user.guest && req.user.guest.room_id,
      menu_id: req.body.menu_id,
      remarks: req.body.remarks,
    }
    try {
      const response = await menuOrders.createItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}
