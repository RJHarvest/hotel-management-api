module.exports = (sequelize, Sequelize) => {
  let MenuOrders = sequelize.define('menuOrders' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    menu_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('pending', 'in_progress', 'done'),
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
    tableName: 'menu_orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  return MenuOrders
}
