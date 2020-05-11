const { reqGuestAuth } = require('../../middlewares/reqAuth')

module.exports = (app) => {
  const task = app.services.requireService('task')

  // get all tasks
  app.get('/api/guest/task', reqGuestAuth, async (req, res, next) => {
    try {
      const response = await task.getItems()
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

}
