var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appUserTimeList = sequelize.define('appUserTimeList', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    time: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'app_user_time_list'
  });

  return appUserTimeList;
};