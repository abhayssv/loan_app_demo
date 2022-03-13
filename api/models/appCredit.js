var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appCredit = sequelize.define('appCredit', {
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
    user_id: DataTypes.INTEGER, 
    level: DataTypes.INTEGER,
    credit: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'credit'
  });

  return appCredit;
};