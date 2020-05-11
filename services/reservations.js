const squel = require('squel')
const sequelize = require('./sequelize')

class GetAvailableRoomsResponseItem {
  constructor(room) {
    this.id = room.id
    this.room_number = room.room_number
    this.room_type = room.room_type
    this.room_capacity = room.room_capacity
    this.price_rate = room.price_rate
  }
}

class GetReservationResponseItem {
  constructor(reservation) {
    this.id = reservation.id
    this.guest_id = reservation.guest_id
    this.room_id = reservation.room_id
    this.check_in = reservation.check_in
    this.check_out = reservation.check_out
    this.status = reservation.status
    this.created_at = reservation.created_at
    this.updated_at = reservation.updated_at
  }
}

class GetCheckInOutResponseItem {
  constructor(reservation) {
    this.id = reservation.id
    this.guest_id = reservation.guest_id
    this.room_id = reservation.room_id
    this.first_name = reservation.first_name
    this.last_name = reservation.last_name
    this.passport_number = reservation.passport_number
    this.phone_number = reservation.phone_number
    this.email = reservation.email
    this.room_number = reservation.room_number
    this.room_type = reservation.room_type
    this.room_capacity = reservation.room_capacity
    this.price_rate = reservation.price_rate
    this.check_in = reservation.check_in
    this.check_out = reservation.check_out
    this.status = reservation.status
  }
}

class Reservations {
  constructor(models) {
    this.models = models
  }

  async getAvailableRooms(params) {
    const checkIn = params.check_in
    const checkOut = params.check_out
    const roomType = params.room_type
    const roomCapacity = params.room_capacity
    const priceRate = params.price_rate

    const roomTypeWhere = roomType && `r.room_type = '${roomType}'`
    const roomCapacityWhere = roomCapacity && `r.room_capacity = '${roomCapacity}'`
    const priceRateWhere = priceRate && `r.price_rate <= '${priceRate}'`

    const whereFilter = [roomTypeWhere, roomCapacityWhere, priceRateWhere].filter((where)=>!!where).join(' AND ')

    const query = squel
    .select()
    .field('r.id')
    .field('r.room_number')
    .field('r.room_type')
    .field('r.room_capacity')
    .field('r.price_rate')
    .from('rooms', 'r')
    .left_join(
      'reservations',
      're',
      `re.room_id = r.id AND re.check_out >= ${checkIn} AND re.check_in <= ${checkOut} AND re.status <> 'checked_out'`)
    .where('re.id IS NULL')
    .where(whereFilter)

    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    if (!instances) {
      return Promise.reject(instances)
    }
    const response = instances.map(instance => new GetAvailableRoomsResponseItem(instance))
    return response
  }

  async getReservation(params) {
    const reservationId = params.id
    
    // check reservation id instance
    const reservationInstance = await this.models.Reservations.findAllAccessible(reservationId)
    if (!reservationInstance) {
      return Promise.reject(reservationInstance)
    }
    
    // find reservation by id
    const instance = await this.models.Reservations.findByPk(reservationId)
    if (!instance) {
      return Promise.reject(instance)
    }

    const response = new GetReservationResponseItem(instance)
    return response
  }

  async getGuestCheckIn(params) {
    const reservationId = params.id

    // check reservation id instance
    const reservationInstance = await this.models.Reservations.findAllAccessible(reservationId)
    if (!reservationInstance) {
      return Promise.reject(reservationInstance)
    }
    
    const query = squel
    .select()
    .field('re.id')
    .field('re.check_in')
    .field('re.check_out')
    .field('re.status')
    .field('g.id', 'guest_id')
    .field('g.first_name')
    .field('g.last_name')
    .field('g.passport_number')
    .field('g.phone_number')
    .field('g.email')
    .field('r.id', 'room_id')
    .field('r.room_number')
    .field('r.room_type')
    .field('r.room_capacity')
    .field('r.price_rate')
    .from('reservations', 're')
    .join('guests', 'g', 'g.id = re.guest_id')
    .join('rooms', 'r', 'r.id = re.room_id')
    .where('re.id = ?', reservationId)
    .where('re.status = "reserved"')

    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    const reservation = instances[0]
    if (!reservation) {
      return Promise.reject(reservation)
    }

    const response = new GetCheckInOutResponseItem(reservation)
    return response
  }

  async getGuestCheckOut(params) {
    const roomNumber = params.room_number
    
    const query = squel
    .select()
    .field('re.id')
    .field('re.check_in')
    .field('re.check_out')
    .field('re.status')
    .field('g.id', 'guest_id')
    .field('g.first_name')
    .field('g.last_name')
    .field('g.passport_number')
    .field('g.phone_number')
    .field('g.email')
    .field('r.id', 'room_id')
    .field('r.room_number')
    .field('r.room_type')
    .field('r.room_capacity')
    .field('r.price_rate')
    .from('reservations', 're')
    .join('guests', 'g', 'g.id = re.guest_id')
    .join('rooms', 'r', 'r.id = re.room_id')
    .where('r.room_number = ?', roomNumber)
    .where('re.status = "checked_in"')

    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    const reservation = instances[0]
    if (!reservation) {
      return Promise.reject(reservation)
    }

    const response = new GetCheckInOutResponseItem(reservation)
    return response
  }

  async checkInGuest(params) {
    const reservationId = params.id

    // check reservation id instance
    const reservationInstance = await this.models.Reservations.findAllAccessible(reservationId)
    if (!reservationInstance) {
      return Promise.reject(reservationInstance)
    }

    // update reservation status to check in
    await this.models.Reservations.update({ status: 'checked_in' }, { where: { id: reservationId } })

    const response = await this.getReservation({ id: reservationId })
    return response
  }

  async checkOutGuest(params) {
    const reservationId = params.id

    // check reservation id instance
    const reservationInstance = await this.models.Reservations.findAllAccessible(reservationId)
    if (!reservationInstance) {
      return Promise.reject(reservationInstance)
    }

    // update reservation status to check in
    await this.models.Reservations.update({ status: 'checked_out' }, { where: { id: reservationId } })

    const response = await this.getReservation({ id: reservationId })
    return response
  }

  async createReservation(params) {
    const guestId = params.guest_id
    const roomId = params.room_id

    // check guest instance id
    const guestInstance = await this.models.Guest.findAllAccessible(guestId)
    if (!guestInstance) return Promise.reject(guestInstance)

    // check room instance id
    const roomInstance = await this.models.Rooms.findAllAccessible(roomId)
    if (!roomInstance) return Promise.reject(roomInstance)

    // create new reservation
    const createReservationInstanceParams = this.getCreateReservationInstanceParams(params)
    const instance = await this.models.Reservations.create(createReservationInstanceParams)
    if (!instance) {
      return Promise.reject(instance)
    }

    const response = new GetReservationResponseItem(instance)
    return response
  }

  getCreateReservationInstanceParams(params) {
    return {
      guest_id: params.guest_id,
      room_id: params.room_id,
      check_in: params.check_in,
      check_out: params.check_out,
    }
  }

}

module.exports = {
  Reservations
}
