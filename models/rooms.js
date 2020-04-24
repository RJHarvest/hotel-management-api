module.exports = (sequelize, Sequelize) => {
  let Rooms = sequelize.define('rooms' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    room_number: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    room_type: {
      type: Sequelize.ENUM('deluxe room','premium room','sea view room','executive room','executive suite','royal suite','presidential suite'),
      allowNull: true,
    },
    price_rate: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: true,
    }
  }, {
    tableName: 'rooms',
    timestamps: false,
  })

  return Rooms
}
