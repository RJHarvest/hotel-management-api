module.exports = (sequelize, Sequelize) => {
  let Category = sequelize.define('category' ,{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'category',
    timestamps: false,
  })

  return Category
}
