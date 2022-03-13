var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var manageCoins = sequelize.define('manageCoins', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    v_coins: DataTypes.INTEGER, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE 
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'manage_coins'
  });

  return manageCoins;
};