module.exports = (sequelize, Sequelize) => {
  let Reservations = sequelize.define('reservations' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    guest_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    check_in: {
      type: Sequelize.DATE,
      allowNull: true
    },
    check_out: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('reserved','checked_in','checked_out'),
      allowNull: false,
      defaultValue: 'reserved'
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
    tableName: 'reservations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })

  return Reservations
}
