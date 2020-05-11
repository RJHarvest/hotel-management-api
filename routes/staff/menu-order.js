const { reqStaffAuth } = require('../../middlewares/reqAuth')
const { reqKitchenPermission } = require('../../middlewares/reqPermission')
const reqAuthPerm = [reqStaffAuth, reqKitchenPermission]

module.exports = (app) => {
  const menuOrders = app.services.requireService('menuOrders')

  // get all menu orders
  app.get('/api/staff/menu-orders', reqAuthPerm, async (req, res, next) => {
    try {
      const response = await menuOrders.getItems()
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // update order status
  app.put('/api/staff/menu-orders/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
      status: req.body.status
    }
    try {
      const response = await menuOrders.updateItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}
