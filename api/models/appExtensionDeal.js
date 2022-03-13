var generalConfig = require('../config/generalConfig');
const Sequalize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var appExtensionDeal= sequelize.define('appExtensionDeal', {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tenure:DataTypes.INTEGER,
      amount:DataTypes.INTEGER,
      user_type:DataTypes.INTEGER,
      level:DataTypes.INTEGER,
      status:DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_at: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'extension_deal'
    });
  
    return appExtensionDeal;
};