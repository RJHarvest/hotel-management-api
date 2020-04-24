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
    
    this.Rooms.belongsTo(this.MenuOrders, { foreignKey: 'room_id' })
    this.Menu.belongsTo(this.MenuOrders, { foreignKey: 'menu_id' })
    this.MenuOrders.hasMany(this.Rooms, { foreignKey: 'room_id' })
    this.MenuOrders.hasMany(this.Menu, { foriegnKey: 'menu_id' })

    this.Rooms.belongsTo(this.RoomServices, { foreignKey: 'room_id' })
    this.Task.belongsTo(this.RoomServices, { foreignKey: 'task_id' })
    this.RoomServices.hasMany(this.Rooms, { foreignKey: 'room_id' })
    this.RoomServices.hasMany(this.Task, { foreignKey: 'task_id' })

    this.Guest.belongsTo(this.Reservations, { foreignKey: 'guest_id' })
    this.Rooms.belongsTo(this.Reservations, { foreignKey: 'room_id' })
    this.Reservations.hasMany(this.Guest, { foreignKey: 'guest_id' })
    this.Reservations.hasMany(this.Rooms, { foreignKey: 'room_id' })

    // added functions to model
    this.Menu.findAllAccessible = async (isActive, menuId) => {
      const query = {
        where: { id: menuId }
      }
      const result = await this.Menu.scope(isActive && 'active').findAll(query)
      return result
    }

    this.MenuOrders.findAllAccessible = async (menuOrderId) => {
      const query = {
        where: { id: menuOrderId }
      }
      const result = await this.MenuOrders.findAll(query)
      return result
    }

  }
}

module.exports = {
  ModelManager
}
