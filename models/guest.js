module.exports = (sequelize, Sequelize) => {
  let Guest = sequelize.define('guest' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    first_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    last_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    passport_number: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    phone_number: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    email: {
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
    tableName: 'guests',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  return Guest
}
