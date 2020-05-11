const squel = require('squel')
const sequelize = require('./sequelize')

class GetTaskResponseItem {
  constructor(task) {
    this.id = task.id
    this.task = task.task
  }
}

class Task {
  constructor(models) {
    this.models = models
  }

  async getItems() {
    const instances = await this.models.Task.findAll()
    if (!instances) {
      return Promise.reject(instances)
    }
    const response = instances.map(instance => new GetTaskResponseItem(instance))
    return response
  }

}

module.exports = {
  Task
}
