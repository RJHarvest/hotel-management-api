module.exports = (sequelize, Sequelize) => {
  let Staff = sequelize.define('staff' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    last_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    first_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    role: {
      type: Sequelize.ENUM('front_desk','room_service','kitchen','manager'),
      allowNull: false,
      defaultValue: 'front_desk'
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
    tableName: 'staff',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  return Staff
}
