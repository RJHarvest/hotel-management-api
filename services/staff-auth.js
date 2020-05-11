const squel = require('squel')
const sequelize = require('./sequelize')
const bcrypt = require('bcrypt')

class GetStaffResponseItem {
  constructor(staff) {
    this.id = staff.id
    this.first_name = staff.first_name
    this.last_name = staff.last_name
    this.role = staff.role
    this.username = staff.username
    this.password = staff.password
    this.created_at = staff.created_at
    this.updated_at = staff.updated_at
  }
}

class StaffAuth {
  constructor(models) {
    this.models = models
  }

  async getStaff(params) {
    const userId = params.user_id
    
    const instance = await this.models.Staff.findByPk(userId)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetStaffResponseItem(instance)
    return response
  }

  async createStaff(params) {
    const password = params.password
    
    // generate hash password
    const hashPassword = await this.getHashPassword(password)
    params.password = hashPassword
    // create new Staff
    const createStaffInstanceParams = this.getCreateStaffInstanceParams(params)
    const instance = await this.models.Staff.create(createStaffInstanceParams)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetStaffResponseItem(instance)
    return response
  }

  async updatePassword(params) {
    const userId = params.user_id
    const password = params.password

    // check staff instance by id
    const staffInstance = await this.models.Staff.findAllAccesible(userId)
    if (!staffInstance) {
      return Promise.reject(staffInstance)
    }

    // generate hash password
    const hashPassword = await this.getHashPassword(password)
    const passwordInstanceParams = this.getPasswordInstanceParams(hash)
    await this.models.Staff.update(passwordInstanceParams, { where: { id: userId } })
    const response = await this.getStaff({ user_id: userId })
    return response
  }
  
  async getHashPassword(password) {
    const saltRounds = 10
    const hash = await bcrypt.hashSync(password, saltRounds)
    return hash
  }

  getCreateStaffInstanceParams(params) {
    return {
      first_name: params.first_name,
      last_name: params.last_name,
      role: params.role,
      username: params.username,
      password: params.password,
    }
  }

  getPasswordInstanceParams(params) {
    return {
      password: params.password
    }
  }

}

module.exports = {
  StaffAuth
}
