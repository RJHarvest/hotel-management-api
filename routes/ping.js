module.exports = (app) => {
  // Ping server connection
  app.get('/api/ping', (req, res, next) => {
    res.status(200).send({"status": "up"})
  })
}
