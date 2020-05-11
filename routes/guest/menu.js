const { reqGuestAuth } = require('../../middlewares/reqAuth')

module.exports = (app) => {
  const menu = app.services.requireService('menu')

  // get all active menu items
  app.get('/api/guest/menu', reqGuestAuth, async (req, res, next) => {
    const params = {
      guest_id: req.user.guest && req.user.guest.id,
      search: req.body.search,
      category_id: req.body.category_id,
    }
    try {
      const response = await menu.getItems(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

}
