var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var settings = sequelize.define('settings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    aadar_verification: DataTypes.INTEGER,
    updated_at: DataTypes.DATE,
    pan_verification:DataTypes.INTEGER
  },{
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'settings'
  });

  return settings;
};