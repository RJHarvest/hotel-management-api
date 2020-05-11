const path = require('path')
const { reqStaffAuth } = require('../../middlewares/reqAuth')
const { reqKitchenPermission } = require('../../middlewares/reqPermission')
const upload = require('../../middlewares/upload')
const reqAuthPerm = [reqStaffAuth, reqKitchenPermission]
const uploadSingle = upload.single('image')

module.exports = (app) => {
  const menu = app.services.requireService('menu')

  // Get all menu items
  app.get('/api/staff/menu', reqAuthPerm, async (req, res, next) => {
    const params = {
      user_id: req.user.staff.id,
      search: req.query.search,
      category: req.query.category,
      isActive: req.query.isActive,
      sort: req.query.sort,
      sortOrder: req.query.sortOrder
    }
    try {
      const response = await menu.getItems(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // Get a single menu item
  app.get('/api/staff/menu/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      user_id: req.user.staff.id,
      id: req.params.id
    }
    try {
      const response = await menu.getItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // Create menu item
  app.post('/api/staff/menu', reqAuthPerm, uploadSingle, async (req, res, next) => {
    const params = {
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: (req.file && req.file.filename) || 'noimage.jpg',
      status: req.body.status
    }
    try {
      const response = await menu.createItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // Update menu item
  app.put('/api/staff/menu/:id', reqAuthPerm, uploadSingle, async (req, res, next) => {
    const params = {
      user_id: req.user.staff.id,
      id: req.params.id,
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: (req.file && req.file.filename) || 'noimage.jpg',
      status: req.body.status
    }
    try {
      const response = await menu.updateItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}
