const { reqStaffAuth } = require('../../middlewares/reqAuth')
const { reqKitchenPermission } = require('../../middlewares/reqPermission')
const reqAuthPerm = [reqStaffAuth, reqKitchenPermission]
const { createCategory } = require('../../validations/category-validation')

module.exports = (app) => {
  const category = app.services.requireService('category')

  // get all categories
  app.get('/api/staff/category', reqAuthPerm, async (req, res, next) => {
    const params = {
      search: req.query.search,
      sort: req.query.sort,
      sort_order: req.query.sort_order,
    }
    try {
      const response = await category.getItems(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // get single category
  app.get('/api/staff/category/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
    }
    try {
      const response = await category.getItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // create category
  app.post('/api/staff/category', reqAuthPerm, createCategory, async (req, res, next) => {
    const params = {
      name: req.body.name,
    }
    try {
      const response = await category.createItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // update category
  app.put('/api/staff/category/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
      name: req.body.name,
    }
    try {
      const response = await category.updateItem(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

}
