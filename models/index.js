const Sequelize = require('sequelize')
const sequelize = require('../services/sequelize')
const Staff = require('./staff')
const Guest = require('./guest')
const Menu = require('./menu')
const Category = require('./category')
const MenuOrders = require('./menu-orders')
const Rooms = require('./rooms')
const RoomServices = require('./room-services')
const Task = require('./task')
const Reservations = require('./reservations')

class ModelManager {
  constructor() {
    this.sequelize = sequelize
    this.Staff = Staff(sequelize, Sequelize)
    this.Guest = Guest(sequelize, Sequelize)
    this.Menu = Menu(sequelize, Sequelize)
    this.Category = Category(sequelize, Sequelize)
    this.MenuOrders = MenuOrders(sequelize, Sequelize)
    this.Rooms = Rooms(sequelize, Sequelize)
    this.RoomServices = RoomServices(sequelize, Sequelize)
    this.Task = Task(sequelize, Sequelize)
    this.Reservations = Reservations(sequelize, Sequelize)

    this.Category.belongsTo(this.Menu, { foreignKey: 'category_id' })
    this.Menu.hasMany(this.Category, { foreignKey: 'category_id' })
    
    //this.Rooms.belongsTo(this.MenuOrders, { foreignKey: 'room_id' })
    //this.Menu.belongsTo(this.MenuOrders, { foreignKey: 'menu_id' })
    //this.MenuOrders.hasMany(this.Rooms, { foreignKey: 'room_id' })
    //this.MenuOrders.hasMany(this.Menu, { foriegnKey: 'menu_id' })

    //this.Rooms.belongsTo(this.RoomServices, { foreignKey: 'room_id' })
    //this.Task.belongsTo(this.RoomServices, { foreignKey: 'task_id' })
    //this.RoomServices.hasMany(this.Rooms, { foreignKey: 'room_id' })
    //this.RoomServices.hasMany(this.Task, { foreignKey: 'task_id' })

    //this.Guest.belongsTo(this.Reservations, { foreignKey: 'guest_id' })
    //this.Rooms.belongsTo(this.Reservations, { foreignKey: 'room_id' })
    //this.Reservations.hasMany(this.Guest, { foreignKey: 'guest_id' })
    //this.Reservations.hasMany(this.Rooms, { foreignKey: 'room_id' })

    // added functions to model
    this.Staff.findAllAccessible = async (staffId) => {
      const query = {
        where: { id: staffId }
      }
      const result = await this.Staff.findAll(query)
      return result
    }

    this.Guest.findAllAccessible = async (guestId) => {
      const query = {
        where: { id: guestId }
      }
      const result = await this.Guest.findAll(query)
      return result
    }

    this.Menu.findAllAccessible = async (isActive, menuId) => {
      const query = {
        where: { id: menuId }
      }
      const result = await this.Menu.scope(isActive && 'active').findAll(query)
      return result
    }

    this.Category.findAllAccessible = async (categoryId) => {
      const query = {
        where: { id: categoryId }
      }
      const result = await this.Category.findAll(query)
      return result
    }

    this.MenuOrders.findAllAccessible = async (menuOrderId) => {
      const query = {
        where: { id: menuOrderId }
      }
      const result = await this.MenuOrders.findAll(query)
      return result
    }

    this.Rooms.findAllAccessible = async (roomId) => {
      const query = {
        where: { id: roomId }
      }
      const result = await this.Rooms.findAll(query)
      return result
    }

    this.RoomServices.findAllAccessible = async (roomServiceId) => {
      const query = {
        where: { id: roomServiceId }
      }
      const result = await this.RoomServices.findAll(query)
      return result
    }

    this.Task.findAllAccessible = async (taskId) => {
      const query = {
        where: { id: taskId }
      }
      const result = await this.Task.findAll(query)
      return result
    }

    this.Reservations.findAllAccessible = async (reservationId) => {
      const query = {
        where: { id: reservationId }
      }
      const result = await this.Reservations.findAll(query)
      return result
    }

  }
}

module.exports = {
  ModelManager
}
