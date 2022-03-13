const Sequalize = require("sequelize");
var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appBankInfo = sequelize.define('appBankInfo', {
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
    bank_name: DataTypes.STRING,
    branch: DataTypes.STRING,
    account_name: DataTypes.STRING,
    account_no: DataTypes.STRING,
    ifsc_code: DataTypes.STRING,
    full_fill: DataTypes.DOUBLE,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'bank_details',
    classMethods: {
      associate: function (models) {
        appBankInfo.belongsTo(models.appUser, {
          foreignKey: 'user_id'
        }); 
        appBankInfo.belongsTo(models.appBasicInfo, {
          foreignKey: 'user_id'
        }); 
      }
    }
  });
  return appBankInfo;
};