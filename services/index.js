const { ModelManager } = require('../models')
const { StaffAuth } = require('./staff-auth')
const { Category } = require('./category')
const { Menu } = require('./menu')
const { MenuOrders } = require('./menu-orders')
const { RoomServices } = require('./room-services')
const { Task } = require('./task')
const { Reservations } = require('./reservations')
const { Guests } = require('./guests')

const services = new class Services {
  constructor() {
    this.models = new ModelManager()
    //this.guestAuth = new GuestAuth(passport, this.models)
    this.staffAuth = new StaffAuth(this.models)
    //this.rooms = new Rooms(this.models)
    this.reservations = new Reservations(this.models)
    this.roomServices = new RoomServices(this.models)
    this.menuOrders = new MenuOrders(this.models)
    this.menu = new Menu(this.models)
    this.category = new Category(this.models)
    this.guests = new Guests(this.models)
    this.task = new Task(this.models)
    //this.reports = new Reports(this.models)
  }

  requireService(service) {
    if (typeof this[service] === 'undefined') {
      throw new Error('service dependency required')
    }
    return this[service]
  }
}

module.exports = services
