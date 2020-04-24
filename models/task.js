module.exports = (sequelize, Sequelize) => {
  let Task = sequelize.define('task' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    task: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
  }, {
    tableName: 'task',
    timestamps: false,
  })

  return Task
}
