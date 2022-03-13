var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appUserLimit = sequelize.define('appUserLimit', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    user_type: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    initial_limit: DataTypes.INTEGER, 
    final_limit: DataTypes.INTEGER, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'app_user_limit'
  });

  return appUserLimit;
};