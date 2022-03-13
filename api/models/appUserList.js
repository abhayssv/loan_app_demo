var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appUserList = sequelize.define('appUserList', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'app_user_list'
  });

  return appUserList;
};