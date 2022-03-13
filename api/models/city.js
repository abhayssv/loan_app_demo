var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appCity = sequelize.define('appCity', {
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }, 
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    city_name: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'city_list'
  });

  return appCity;
};