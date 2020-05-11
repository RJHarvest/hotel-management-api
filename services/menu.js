const squel = require('squel')
const sequelize = require('./sequelize')

class GetMenuResponseItem {
  constructor(menu) {
    this.id = menu.id
    this.name = menu.name
    this.description = menu.description
    this.price = menu.price
    this.image = menu.image
    this.status = menu.status
    this.start_date = menu.start_date
    this.end_date = menu.end_date
    this.created_at = menu.created_at
    this.updated_at = menu.updated_at
  }
}

class Menu {
  constructor(models) {
    this.models = models
  }

  async getItems(params) {
    const guestId = params.guest_id
    const search = params.search
    const categoryId = params.category_id
    const sort = params.sort || 'created_at'
    const sortOrder = params.sortOrder || 'DESC'

    // add filters
    const searchWhere = `name LIKE '%${search}%'`
    const categoryWhere = `category_id = ${categoryId}`
    const where = [searchWhere, categoryWhere].filter((where)=>!!where).join(' AND ')
    
    let query = squel
      .select()
      .from('menu')
      .where(`status = ${isActive}`)
      .where(where)
    
    if (guestId) {
      query = query
        .where('status = "active" AND CURDATE() BETWEEN start_date AND end_date')
    }

    // add sorting
    query = query
      .order(sort, sortOrder)

    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    if (!instances) {
      return Promise.reject(instances)
    }
    const response = instances.map(instance => new GetMenuResponseItem(instance))
    return response
  }

  async getItem(params) {
    const menuId = params.id
    
    const instance = await this.models.Menu.findByPk(menuId)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetMenuResponseItem(instance)
    return response
  }

  async createItem(params) {
    // create new menu item
    const createMenuInstanceParams = this.getNewMenuInstanceParams(params)
    const instance = await this.models.Menu.create(createMenuInstanceParams)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetMenuResponseItem(instance)
    return response
  }

  async updateItem(params) {
    const menuId = params.id

    // check menu id instance
    const menuInstance = this.models.Menu.findAllAccessible(false, menuId)
    if (!menuInstance) {
      return Promise.reject('Menu item id does not exist')
    }
    // update menu item
    const updateMenuInstanceParams = this.getNewMenuInstanceParams(params)
    await this.models.Menu.update(updateMenuInstanceParams, { where: { id: menuId } })
    const response = await this.getItem({ id: menuId })
    return response
  }
  
  getNewMenuInstanceParams(params) {
    return {
      category_id: params.category_id,
      name: params.name,
      description: params.description,
      price: params.price,
      image: params.image,
      status: params.status,
      start_date: params.start_date,
      end_date: params.end_date,
    }
  }

}

module.exports = {
  Menu
}
