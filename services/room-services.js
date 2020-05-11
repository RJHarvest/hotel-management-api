const squel = require('squel')
const sequelize = require('./sequelize')

class GetRoomServiceResponseItems {
  constructor(roomService) {
    this.id = roomService.id
    this.room_id = roomService.room_id
    this.task_id = roomService.task_id
    this.room_number = roomService.room_number
    this.name = roomService.name
    this.status = roomService.status
    this.remarks = roomService.remarks
    this.created_at = roomService.created_at
    this.updated_at = roomService.updated_at
  }
}

class GetRoomServiceResponseItem {
  constructor(roomService) {
    this.id = roomService.id
    this.room_id = roomService.room_id
    this.task_id = roomService.task_id
    this.status = roomService.status
    this.remarks = roomService.remarks
    this.created_at = roomService.created_at
    this.updated_at = roomService.updated_at
  }
}

class RoomServices {
  constructor(models) {
    this.models = models
  }

  async getItems(params) {
    const roomId = params && params.room_id
    
    let query = squel
      .select()
      .field('rs.id')
      .field('rs.status')
      .field('rs.remarks')
      .field('rs.created_at')
      .field('rs.updated_at')
      .field('r.id', 'room_id')
      .field('r.room_number')
      .field('t.id', 'task_id')
      .field('t.task')
      .from('room_services', 'rs')
      .join('rooms', 'r', 'r.id = rs.room_id')
      .join('task', 't', 't.id = rs.task_id')
      .where('DATE(rs.created_at) = CURDATE()')

    // filter room id if func called by guest
    if (roomId) {
      query = query
        .where('r.id = ?', roomId) 
    }

    const instances = await sequelize.query(query.toString(), { type: sequelize.QueryTypes.SELECT }) 
    if (!instances) {
      return Promise.reject(instances)
    }
    const response = instances.map(instance => new GetRoomServiceResponseItems(instance))
    return response
  }

  async getItem(params) {
    const roomServiceId = params.id
    
    const instance = await this.models.RoomServices.findByPk(roomServiceId)
    if (!instance) {
      return Promise.reject(instance)
    }
    const response = new GetRoomServiceResponseItem(instance)
    return response
  }

  async createItem(params) {
    const roomId = params.room_id
    const taskId = params.task_id

    // check if guest is checked in room id
    const roomInstance = await this.models.Reservation.findCheckedInRoom(roomId)
    if (!roomInstance) return Promise.reject(roomInstance)
    // check task id instance
    const taskInstance = await this.models.Task.findAllAccessible(taskId)
    if (!taskInstance) return Promise.reject(taskInstance)

    // create room service
    const createRoomServiceInstanceParams = this.getCreateRoomServiceInstanceParams(params)
    const instance = await this.models.RoomServices.create(createRoomServiceInstanceParams)
    if (!instance) return Promise.reject(instance)

    const response = new GetRoomServiceResponseItem(instance)
    return response
  }

  async updateItem(params) {
    const roomServiceId = params.id

    // check room service id instance
    const roomServiceInstance = this.models.RoomServices.findAllAccessible(roomServiceId)
    if (!roomServiceInstance) {
      return Promise.reject(roomServiceInstance)
    }
    // update room service item
    const updateRoomServiceInstanceParams = this.getUpdateRoomServiceInstanceParams(params)
    await this.models.RoomServices.update(updateRoomServiceInstanceParams, { where: { id: roomServiceId } })

    const response = await this.getItem({ id: roomServiceId })
    return response
  }
  
  getCreateRoomServiceInstanceParams(params) {
    return {
      room_id: params.room_id,
      task_id: params.task_id,
      remarks: params.remarks,
    }
  }

  getUpdateRoomServiceInstanceParams(params) {
    return {
      status: params.status,
    }
  }

}

module.exports = {
  RoomServices
}
