const path = require('path')
const fs = require('fs') 
const { reqAuth } = require('../middlewares/reqAuth')

module.exports = (app) => {
  // get an image file
  app.get('/api/image/:name', reqAuth, (req, res, next) => {
    const { name } = req.params
    const images = fs.readdirSync(path.join(__dirname, '..', 'uploads'))

    images.forEach(image => {
      if (image !== name) {
        return res.sendFile(path.join(__dirname, '..', 'uploads/noimage.jpg'))
      }
      res.sendFile(path.join(__dirname, '..', 'uploads', name))
    })
  })
}
