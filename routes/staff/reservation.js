const { reqStaffAuth } = require('../../middlewares/reqAuth')
const { reqFrontDeskPermission } = require('../../middlewares/reqPermission')
const reqAuthPerm = [reqStaffAuth, reqFrontDeskPermission]

module.exports = (app) => {
  const reservations = app.services.requireService('reservations')

  // create a reservation
  app.post('/api/staff/reservations', reqAuthPerm, async (req, res, next) => {
    const params = {
      guest_id: req.body.guest_id,
      room_id: req.body.room_id,
      check_in: req.body.check_in,
      check_out: req.body.check_out,
    }
    try {
      const response = await reservations.createReservation(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // check for all available rooms
  app.get('/api/staff/available-rooms', reqAuthPerm, async (req, res, next) => {
    const params = {
      check_in: req.body.check_in,
      check_out: req.body.check_out,
      room_type: req.body.room_type,
      room_capacity: req.body.room_capacity,
      price_rate: req.body.price_rate,
    }
    try {
      const response = await reservations.getAvailableRooms(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // get reservation by id
  app.get('/api/staff/reservation/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
    }
    try {
      const response = await reservations.getReservation(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // get guest reservation for check in
  app.get('/api/staff/check_in/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
    }
    try {
      const response = await reservations.getGuestCheckIn(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // get guest reservation for check out
  app.get('/api/staff/check_out/:room_number', reqAuthPerm, async (req, res, next) => {
    const params = {
      room_number: req.params.room_number,
    }
    try {
      const response = await reservations.getGuestCheckOut(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // check in guest 
  app.put('/api/staff/check_in/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
    }
    try {
      const response = await reservations.checkInGuest(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })

  // check out guest 
  app.put('/api/staff/check_out/:id', reqAuthPerm, async (req, res, next) => {
    const params = {
      id: req.params.id,
    }
    try {
      const response = await reservations.checkOutGuest(params)
      res.send(response)
    } catch(e) {
      res.send(e)
    }
  })
}   
