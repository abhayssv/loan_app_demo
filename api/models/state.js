var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appState = sequelize.define('appState', {
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    state_name: DataTypes.STRING, 
    country_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'state_list'
  });

  return appState;
};