var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var userCategory = sequelize.define('userCategory', {
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: DataTypes.STRING, 
    description: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'users_category'
  });

  return userCategory;
};