var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var adminPermission = sequelize.define('adminPermission', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    per_name: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'users_permission'
  });

  return adminPermission;
};