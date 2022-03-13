var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appInfo = sequelize.define('appInfo', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: DataTypes.STRING, 
    imei_1: DataTypes.STRING,
    imei_2: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'appInfo'
  });

  return appInfo;
};