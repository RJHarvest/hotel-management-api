module.exports = (sequelize, Sequelize) => {
  let RoomServices = sequelize.define('roomServices' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    task_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('pending','checked_in','checked_out'),
      allowNull: false,
      defaultValue: 'pending'
    },
    remarks: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.Now
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.Now
    }
  }, {
    tableName: 'room_services',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })

  return RoomServices
}
