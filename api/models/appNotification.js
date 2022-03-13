var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appNotify = sequelize.define('appNotify', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }, 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    message: DataTypes.STRING, 
    status: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'app_notification'
  });

  return appNotify;
};