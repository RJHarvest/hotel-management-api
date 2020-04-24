module.exports = (sequelize, Sequelize) => {
  let Menu = sequelize.define('menu' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: true
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'active'
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: true,
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
    tableName: 'menu',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    scopes: {
      active: {
        where: {
          status: true
        }
      },
    },
  })

  return Menu
}
