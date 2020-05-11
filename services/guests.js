const squel = require('squel')
const sequelize = require('./sequelize')

class GetCategoryResponseItem {
  constructor(staff) {
    this.id = staff.id
    this.name = staff.name
    this.created_at = staff.created_at
    this.updated_at = staff.updated_at
  }
}

class Guests {
  constructor(models) {
    this.models = models
  }

  async getItems(params) {
    const search = params.search
    const category = params.category
    const isActive = params.isActive || false
    const sort = params.sort || 'created_at'
    const sortOrder = params.sortOrder || 'DESC'
    
    let query = squel
      .select()
      .from('category')
      .where(`status = ${isActive}`)

    if (search) {
      query = query
      .where(`name LIKE '%${search}%'`)
    }
    // add sorting
    query = query
      .order(sort, sortOrder)
    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    if (!instances) {
      return Promise.reject(instances)
    }
    const response = instances.map(instance => new GetCategoryResponseItem(instance))
    return response
  }

  async getItem(params) {
    const categoryId = params.id
    
    const instance = await this.models.Category.findByPk(categoryId)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetCategoryResponseItem(instance)
    return response
  }

  async createItem(params) {
    // create new category item
    const createCategoryInstanceParams = this.getNewCategoryInstanceParams(params)
    const instance = await this.models.Category.create(createCategoryInstanceParams)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetCategoryResponseItem(instance)
    return response
  }

  async updateItem(params) {
    const categoryId = params.id

    // check category id instance
    //const categoryInstance = this.models.Category.findAllAccessible(false, categoryId)
    //if (!categoryInstance) {
    //  return Promise.reject('Category item id does not exist')
    //}
    // update category item
    const updateCategoryInstanceParams = this.getNewCategoryInstanceParams(params)
    await this.models.Category.update(updateCategoryInstanceParams, { where: { id: categoryId } })
    const response = await this.getItem({ id: categoryId })
    return response
  }
  
  getNewCategoryInstanceParams(params) {
    return {
      name: params.name,
    }
  }

}

module.exports = {
  Guests
}
