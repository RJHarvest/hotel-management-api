const squel = require('squel')
const sequelize = require('./sequelize')

class GetMenuOrderResponseItems {
  constructor(menuOrder) {
    this.id = menuOrder.id
    this.room_id = menuOrder.room_id
    this.menu_id = menuOrder.menu_id
    this.room_number = menuOrder.room_number
    this.name = menuOrder.name
    this.description = menuOrder.description
    this.price = menuOrder.price
    this.image = menuOrder.image
    this.status = menuOrder.status
    this.remarks = menuOrder.remarks
    this.created_at = menuOrder.created_at
    this.updated_at = menuOrder.updated_at
  }
}

class GetMenuOrderResponseItem {
  constructor(menuOrder) {
    this.id = menuOrder.id
    this.room_id = menuOrder.room_id
    this.menu_id = menuOrder.menu_id
    this.status = menuOrder.status
    this.remarks = menuOrder.remarks
    this.created_at = menuOrder.created_at
    this.updated_at = menuOrder.updated_at
  }
}

class MenuOrders {
  constructor(models) {
    this.models = models
  }

  async getItems(params) {
    const roomId = params && params.room_id
    
    let query = squel
      .select()
      .field('mo.id')
      .field('mo.status')
      .field('mo.remarks')
      .field('mo.created_at')
      .field('mo.updated_at')
      .field('r.id', 'room_number')
      .field('r.room_number')
      .field('m.id', 'menu_id')
      .field('m.name')
      .field('m.description')
      .field('m.image')
      .field('m.price')
      .from('menu_orders', 'mo')
      .join('rooms', 'r', 'r.id = mo.room_id')
      .join('menu', 'm', 'm.id = mo.menu_id')
      .where('m.status = "active"')
      .where('DATE(mo.created_at) = CURDATE()')

    // filter room id if func called by guest
    if (roomId) {
      query = query
        .where('r.id = ?', roomId) 
    }

    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    if (!instances) {
      return Promise.reject(instances)
    }
    const response = instances.map(instance => new GetMenuOrderResponseItems(instance))
    return response
  }

  async getItem(params) {
    const menuOrderId = params.id
    
    const instance = await this.models.MenuOrders.findByPk(menuOrderId)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetMenuOrderResponseItem(instance)
    return response
  }

  async createItem(params) {
    const roomId = params.room_id
    const menuId = params.menu_id

    // check if guest is checked in room id
    //const reservationInstance = await this.models.Reservation.findCheckedInRoom(roomId)
    //if (!reservationInstance) {
    //  return Promise.reject(reservationInstance)
    //}
    // check menu id instance
    //const menuInstance = await this.models.Menu.findAllAccessible(menuId)
    //if (!menuInstance) {
    //  return Promise.reject(menuInstance)
    //}
    // create new menu order
    const createMenuOrderInstanceParams = this.getCreateMenuOrderInstanceParams(params)
    const instance = await this.models.MenuOrders.create(createMenuOrderInstanceParams)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetMenuOrderResponseItem(instance)
    return response
  }

  async updateItem(params) {
    const menuOrderId = params.id

    // check menu order id instance
    const menuOrderInstance = this.models.MenuOrders.findAllAccessible(menuOrderId)
    if (!menuOrderInstance) {
      return Promise.reject(menuOrderInstance)
    }
    // update menu order item
    const updateMenuOrderInstanceParams = this.getUpdateMenuOrderInstanceParams(params)
    await this.models.MenuOrders.update(updateMenuOrderInstanceParams, { where: { id: menuOrderId } })
    const response = await this.getItem({ id: menuOrderId })
    return response
  }
  
  getCreateMenuOrderInstanceParams(params) {
    return {
      room_id: params.room_id,
      menu_id: params.menu_id,
      status: params.status,
      remarks: params.remarks,
    }
  }

  getUpdateMenuOrderInstanceParams(params) {
    return {
      status: params.status,
    }
  }

}

module.exports = {
  MenuOrders
}
